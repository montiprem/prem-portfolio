# Phase 3 Setup Instructions: Authentication & Database

This document contains the exact steps required to complete the setup of your Supabase authentication and database for the portfolio, ensuring correct PKCE flow and database security.

## 1. Supabase Environment Variables

In your Vercel Project Settings (Settings -> Environment Variables), you must configure the following variables for all environments (Production, Preview, Development). Replace the placeholders with the actual values from your Supabase project dashboard (Project Settings -> API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

*Note: The application is designed to strictly fail and abort build/prerendering if these are missing, rather than fall back to fake credentials.*

## 2. Supabase Redirect URL Configuration

To ensure email confirmations and password resets redirect the user back to the application properly in production, configure your URLs in the Supabase Dashboard (Authentication -> URL Configuration):

1.  **Site URL:** Set this to your production URL: `https://prem-portfolio-drab.vercel.app`
2.  **Redirect URLs:** Add the exact callback route used by the application:
    *   `https://prem-portfolio-drab.vercel.app/auth/callback`
    *   *(Optional but recommended for local dev)* `http://localhost:3000/auth/callback`

## 3. Supabase SQL Migration (Profiles Table & RLS)

You need to create the `profiles` table in your Supabase PostgreSQL database. I have created a robust, idempotent migration file for you at `supabase/migrations/00000000000000_create_profiles.sql`.

Run the following SQL script directly in your Supabase SQL Editor. It creates the table, sets strict Row Level Security (RLS) so users can only read/update their *own* data, and creates a trigger with conflict-handling to auto-generate profiles:

```sql
-- Create profiles table
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint profiles_pkey primary key (id)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Drop existing policies if running multiple times
drop policy if exists "Public profiles are viewable by everyone." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update own profile." on profiles;
drop policy if exists "Users can read own profile." on profiles;

-- NEW RESTRICTED READ POLICY: A user can only read their own profile
create policy "Users can read own profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime
drop publication if exists supabase_realtime;
create publication supabase_realtime;
alter publication supabase_realtime add table profiles;

-- Create a trigger to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing; -- safe guard if profile exists
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 4. Contact Form Configuration

The frontend contact form has been updated to send a `POST` request to `/api/contact`. The backend route safely parses this request but currently only logs it to avoid hardcoding secrets.

To actually send emails to yourself from this form, you will need to add a transactional email provider (like Resend).

**Required Manual Steps:**
1. Sign up for Resend (or a similar provider) and get an API key.
2. Add `RESEND_API_KEY=your_key` to your Vercel environment variables.
3. In `app/api/contact/route.ts`, uncomment the example code and install the necessary package (`npm install resend`).
