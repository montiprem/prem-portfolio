# Phase 3 Setup Instructions: Authentication & Database

This document contains the exact steps required to complete the setup of your Supabase authentication and database for the portfolio.

## 1. Supabase Environment Variables

In the root of your project, create a `.env.local` file (this is already ignored by Git) and add the following variables. Replace the placeholders with the actual values from your Supabase project dashboard (Settings -> API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 2. Supabase SQL Migration (Profiles Table)

You need to create the `profiles` table in your Supabase PostgreSQL database. I have created a migration file for you at `supabase/migrations/00000000000000_create_profiles.sql`.

Run the following SQL script directly in your Supabase SQL Editor to reproduce the schema, Row Level Security (RLS) policies, and automated triggers:

```sql
-- Create profiles table
create table public.profiles (
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

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime
alter publication supabase_realtime add table profiles;

-- Create a trigger to automatically create a profile when a new user signs up
create function public.handle_new_user()
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
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 3. Email Functionality

The codebase has been updated to use Supabase Auth for account creation, login, and password resets. These functions will automatically trigger emails based on your Supabase Email Templates configuration.

*   **Setup required:** Ensure that "Enable Email Confirmations" is turned on (if desired) in your Supabase Authentication settings. Customize your email templates in the Supabase dashboard (Authentication -> Email Templates). Make sure your Site URL (e.g., `http://localhost:3000` for local dev, or your production domain) and Redirect URLs (e.g., `http://localhost:3000/auth/callback`, `http://localhost:3000/reset-password`) are configured in Supabase (Authentication -> URL Configuration).

## 4. Contact Form Configuration

The frontend contact form has been updated to send a `POST` request to `/api/contact`. The backend route safely parses this request but currently only logs it to avoid hardcoding secrets.

To actually send emails to yourself from this form, you will need to add a transactional email provider (like Resend).

**Required Manual Steps:**
1. Sign up for Resend (or a similar provider) and get an API key.
2. Add `RESEND_API_KEY=your_key` to your `.env.local` file (and Vercel environment variables).
3. In `app/api/contact/route.ts`, uncomment the example code and install the necessary package (`npm install resend`).
