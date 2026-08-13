# MASTER SPECIFICATION & CONTEXT DOCUMENT

## 1. Overall Portfolio Purpose and Target Audience
**Purpose:** A professional personal portfolio for Prem Mandal, showcasing his expertise as a Senior BI Developer & Data Analyst. It serves to highlight his skills, experience, projects (dashboards, models), certifications, and provides mechanisms for contact and user authentication (for exclusive resources/dashboard).
**Target Audience:** Recruiters, hiring managers, potential clients for freelance consulting, and data analytics community members.

## 2. Complete Tech Stack and Versions
- **Framework:** Next.js `^16.3.0` (App Router)
- **React:** `19.2.4`
- **Styling:** Tailwind CSS `^4.0.0` (with custom variables/variants)
- **UI Components:** shadcn/ui `^4.16.0`, `@base-ui/react ^1.6.0`, `lucide-react ^1.27.0`, `react-icons ^5.7.0`
- **Animations:** `framer-motion ^12.43.0`, `tailwindcss-animate ^1.0.7`, `tw-animate-css ^1.4.0`
- **Authentication & Database:** `@supabase/ssr ^0.12.4`, `@supabase/supabase-js ^2.112.3`
- **AI Integration:** `@google/genai ^2.15.0`, `openai ^7.2.0` (Used for OpenRouter/DeepSeek)
- **Content Rendering:** `react-markdown ^10.1.0`, `remark-gfm ^4.0.1`
- **TypeScript:** `^5.0.0`

## 3. Project Structure / Important Directories
- `/app`: Next.js App Router (pages, layouts, api routes).
- `/app/api`: Backend routes (`/chat` for AI, `/contact` for form submissions).
- `/app/auth`: Supabase PKCE callback route.
- `/components`: UI components organized by `animations`, `cursor`, `layout`, `loader`, `providers`, `sections` (Hero, About, etc.), and `ui` (buttons, icons).
- `/data`: Static data source files (`blog.ts`, `projects.ts`, `services.ts`, `skills.ts`, `store.ts`, `testimonials.ts`).
- `/lib/supabase`: Supabase client, server, and middleware initialization logic.
- `/public`: Static assets (images, PDFs, SVGs, Next.js generic icons).
- `/supabase/migrations`: SQL scripts for database schema and RLS.

## 4. All Pages and Routes
- `/`: Homepage (aggregates sections)
- `/dashboard`: Protected user area
- `/login`: User authentication (Password & Email OTP)
- `/signup`: User registration
- `/forgot-password`: Password reset request
- `/reset-password`: Set new password
- `/blog`: Blog listing
- `/certifications`: Certifications display
- `/contact`: Contact page
- `/projects`: Detailed project listings
- `/services`: Services offered
- `/store`: Digital products/templates store
- `/cookie-policy`, `/privacy-policy`, `/terms-of-service`: Legal pages
- **API Routes:** `/api/chat`, `/api/contact`, `/auth/callback`

## 5. Navigation Structure
- **Navbar:** Sticky top, blurred background. Contains Logo, standard links (Home, About, Skills, Experience, Projects), a "MORE" dropdown (Certifications, Services, Blog, Store), Theme Toggle, "Resume" download button, and "Get in Touch" CTA. Includes a mobile hamburger menu drawer.
- **Footer:** Contains comprehensive links replicating the navbar, social icons, newsletter subscription UI, and legal links.

## 6. Homepage/Hero Section
- **Content:** Title ("Senior BI Developer & Data Analyst"), introductory text highlighting Power BI, SQL, and DAX.
- **Layout:** Two-column grid (text on left, profile visual/stats on right).
- **Buttons:** "View Projects" (primary), "Contact Me" (secondary).
- **Statistics/Badges:** LinkedIn stats card (e.g., 55k+ followers), "Available for work" status badge.
- **Animations:** Framer motion fade-ins, float animations on images/cards.
- **Profile Section:** Stylized developer avatar/image with floating icons.

## 7. Every Major UI Component and its Purpose
- `Navbar.tsx` / `Footer.tsx`: Global navigation.
- `Preloader.tsx`: Initial loading screen.
- `ChatBot.tsx`: Floating AI assistant widget connecting to `/api/chat`.
- `DeveloperAvatar.tsx`: Visual component for the hero section.
- `ThemeToggle.tsx`: Dark/light mode switcher.
- `Container.tsx`: Standardized max-width wrapper.
- **Sections:** `Hero`, `About`, `Skills`, `Experience`, `Projects`, `Testimonials`, `FAQSection`, `CommunityPresence`, `LifePhilosophy`, `Contact` — Each serves a distinct segment on the single-page layout.

## 8. Design System
- **Colors:** Deep dark background (`#030712`), primary blue (`#2563eb`), secondary cyan/blue (`#60a5fa`), muted slate text.
- **Typography:** `Inter` (Google Font), sans-serif.
- **Spacing/Border Radius:** Tailwind default scales, heavy use of `rounded-2xl` and `rounded-3xl` for a modern, bubbly card look.
- **Shadows/Gradients:** Extensive use of `shadow-xl`, `shadow-blue-500/30`, and text gradients (`bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600`).
- **Responsive Behavior:** Tailwind utility classes (`sm:`, `md:`, `lg:`) ensure mobile-first scaling.

## 9. Desktop/Tablet/Mobile Behavior
- **Desktop:** Multi-column grids (e.g., Hero, Projects).
- **Tablet/Mobile:** Collapses to single columns. Navbar converts to a hamburger menu drawer. Heavy paddings are reduced.

## 10. Projects/Case Studies Structure
- Data driven via `data/projects.ts`.
- Components map over the data to display cards with thumbnails, tech stacks, "Live Demo", and "Source Code" links.

## 11. Skills Section
- Categorized (e.g., Data Viz, Database, Languages) using data from `data/skills.ts`.

## 12. Experience Section
- Chronological timeline format detailing roles, companies, and responsibilities.

## 13. Certifications Section
- Dedicated route (`/certifications`) listing professional achievements (e.g., Microsoft, IBM).

## 14. Blog/Content Section
- Defined in `data/blog.ts` and rendered in `/blog`, providing professional insights.

## 15. Contact Section
- Modern UI form capturing Name, Email, and Message.
- Posts payload to `/api/contact`.

## 16. Resume/CV Functionality
- Direct download link pointing to `/resume/resume.pdf` in the `public` folder.

## 17. AI Chatbot/AI Assistant Functionality
- Component: `ChatBot.tsx` (Floating UI).
- Backend: `/api/chat/route.ts` using OpenRouter API to query `deepseek/deepseek-chat` model with a strict system prompt acting as Prem Mandal's assistant.

## 18. Login/Signup/Authentication System
- **Provider:** Supabase Auth (exclusive).
- **Features:** Email/Password Signup, Email/Password Login, Email OTP Login, Forgot Password, Reset Password.
- **Flow:** Uses strict PKCE flow requiring routing through `/auth/callback` to establish sessions.

## 19. Supabase Integration
- Utilizes `@supabase/ssr`.
- Configured in `lib/supabase/client.ts`, `server.ts`, and `middleware.ts`.
- Strictly enforces presence of `NEXT_PUBLIC_` environment variables, throwing runtime errors if missing to prevent silent fallback failures.

## 20. OTP/Email Authentication Flow
- Implemented in `app/login/page.tsx` as a toggleable option.
- Uses `supabase.auth.signInWithOtp` (with `shouldCreateUser: false` to prevent bypassing registration rules).
- UI handles entering the 6-digit code and calls `supabase.auth.verifyOtp`.
- Signup also utilizes `verifyOtp({ type: 'signup' })` for immediate inline verification.

## 21. Google Authentication
- Currently partially implemented in UI buttons calling `supabase.auth.signInWithOAuth({ provider: 'google' })`. Assumes Supabase Dashboard configuration is/will be completed.

## 22. Database Tables and Relationships
- `auth.users` (Managed by Supabase).
- `public.profiles` (1-to-1 relationship with `auth.users`).

## 23. Profiles Table and RLS
- **Fields:** `id` (uuid, PK, FK to auth.users), `email`, `full_name`, `avatar_url`, `role`, `created_at`, `updated_at`.
- **RLS Policies:** Strictly configured. Users can `SELECT`, `INSERT`, and `UPDATE` only where `auth.uid() = id`. No public read access.

## 24. Database Triggers/Functions
- `public.handle_new_user()`: Triggered `AFTER INSERT` on `auth.users`. Automatically inserts a row into `public.profiles` mapping email and metadata. Includes `ON CONFLICT (id) DO NOTHING` for idempotency.

## 25. Email/SMTP Configuration Expected
- Supabase default templates are required to be modified to display `{{ .Token }}` correctly.
- Custom SMTP (e.g., Resend) is expected to be configured in Supabase Project Settings to achieve "Prem Mandal" branding.

## 26. Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL` (Client/Server)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Client/Server)
- `OPENROUTER_API_KEY` (Server - for Chatbot)
- *Optional/Planned:* `RESEND_API_KEY` (Server - for Contact form emails)

## 27. Vercel Deployment Configuration
- Expected to deploy smoothly. Middleware is configured correctly.
- **Requirement:** Vercel Authentication (Deployment Protection) must be disabled for auth callback routes to work seamlessly. Production URLs must exactly match Supabase allowed redirect URLs.

## 28. SEO Implementation
- Comprehensive metadata implemented in `app/layout.tsx`.
- Structured Data (JSON-LD) injected for Google Rich Snippets representing "Prem Mandal" as a "Person".

## 29. Metadata
- Title template: `%s | Prem Mandal`
- Description: Targeting BI Developer, Data Analyst keywords.
- Generates OpenGraph and Twitter cards.

## 30. sitemap.xml
- Dynamically generated via `app/sitemap.ts` mapping out all static routes.

## 31. robots.txt
- Generated via `app/robots.ts`, allowing all indexing (`index: true, follow: true`).

## 32. Open Graph/social sharing
- Fully configured in `layout.tsx` pointing to `/og-image.png`.

## 33. Performance Optimizations
- Next.js App Router (Server Components by default).
- `next/font/google` for optimized font loading (Inter).
- Next.js `Image` component for optimized static assets.

## 34. Accessibility
- Use of semantic HTML.
- Dark mode toggle respects system preferences.

## 35. Security Measures
- Strict Supabase RLS policies.
- No secrets exposed to the client.
- Middleware protection for `/dashboard` route.
- Contact form migrated from insecure `mailto` to a controlled backend `/api/contact` route.

## 36. Existing Animations/Interactions
- Framer motion triggers elements on viewport enter (`whileInView`).
- `ScrollReveal` wrapper component standardizes fade-up animations.

## 37. External APIs/services
- Supabase (Auth & DB)
- OpenRouter (DeepSeek AI model)

## 38. GitHub Integration
- Generic reference (GitHub icon links to profile). No direct API pulling repos currently.

## 39. Any third-party libraries
- `shadcn/ui`, `lucide-react`, `framer-motion`, `@supabase/ssr`.

## 40. Current known limitations or unfinished features
- `/api/contact` only logs payloads to the console. Transactional email (e.g., Resend) needs to be uncommented and configured with an API key.
- Google OAuth buttons exist but require exact Google Cloud console / Supabase OAuth dashboard setup to function.

---

### A. Route Map
- **Public:** `/`, `/blog`, `/certifications`, `/contact`, `/projects`, `/services`, `/store`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/cookie-policy`, `/privacy-policy`, `/terms-of-service`
- **Protected:** `/dashboard`
- **API:** `/api/chat`, `/api/contact`, `/auth/callback`

### B. Feature Map
- **Showcase:** Hero, About, Skills, Experience, Projects, Certifications, Blog.
- **Engagement:** Contact Form, AI Chat Assistant.
- **User Management:** Signup, Login (Password/OTP), Forgot Password, Dashboard Profile Editing.

### C. Component Map
- **Layout:** `Navbar`, `Footer`, `Container`
- **Sections:** `Hero`, `About`, `Skills`, `Experience`, `Projects`, `Testimonials`, `FAQSection`, `CommunityPresence`, `LifePhilosophy`, `Contact`
- **Utility:** `Preloader`, `ChatBot`, `ScrollReveal`, `ThemeToggle`

### D. Data/Database Map
- **Static Frontend Data:** `projects.ts`, `skills.ts`, `blog.ts`, `services.ts`, `store.ts`, `testimonials.ts`.
- **Backend Database:** `auth.users` <--(1:1)--> `public.profiles`.

### E. Authentication Flow Diagram (Text)
1. User requests Signup `/signup` -> Submits email/password -> `supabase.auth.signUp()` -> Email sent with OTP & Link -> User enters OTP inline -> `verifyOtp()` -> Redirect to `/dashboard`.
2. User requests Login `/login` -> Submits password -> `signInWithPassword()` -> Redirect to `/dashboard`.
3. User requests Login `/login` -> Chooses OTP -> Submits email -> `signInWithOtp()` -> Enters OTP -> `verifyOtp()` -> Redirect to `/dashboard`.
4. User clicks email magic link -> Hits `/auth/callback` -> `exchangeCodeForSession()` -> Redirects to intended protected route (`/dashboard`).

### F. User Journey (Homepage -> Dashboard)
1. User lands on `/` and views portfolio.
2. User clicks a protected asset or "Login" in Navbar.
3. User creates an account on `/signup`.
4. User retrieves OTP from their email inbox, types it into the UI.
5. Session is established; user is redirected to `/dashboard`.
6. User views and updates their `full_name` loaded from `public.profiles`.

### G. Current Production Deployment Assumptions
- Platform: Vercel.
- URL: `https://prem-portfolio-drab.vercel.app`.
- Vercel Deployment Protection (Authentication) is DISABLED.
- Supabase Project is active with correct Site URL and Redirect URLs matching the Vercel domain.
- Required Environment Variables are configured in Vercel.

### H. Areas That Should NOT Be Changed Without Understanding Dependencies
- **`lib/supabase/*` files:** Highly sensitive to Next.js SSR rules. Changing cookie handling will break sessions.
- **`/auth/callback/route.ts`:** Required for PKCE flow. Breaking this breaks email links.
- **SQL Migrations:** The `handle_new_user` trigger is critical. Changing `public.profiles` schema without altering this trigger will break the signup flow.

---

# CURRENT PORTFOLIO BLUEPRINT
**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, Framer Motion, Supabase SSR.
**Architecture:** Single-page style homepage with dedicated detail routes (`/projects`, `/blog`). Data is mostly static TS files (`/data/*`), while User Management relies on Supabase PostgreSQL (`auth.users` -> `public.profiles`).
**Auth Strictness:** Exclusively uses `@supabase/ssr`. Supports Password, Email OTP, and PKCE link flows. NextAuth is completely removed. Client files strictly require env vars.
**Security:** RLS enforced (User can only SELECT/UPDATE their own profile row). Contact form uses backend `/api/contact` route.
**AI:** Features a custom Chatbot component querying DeepSeek via OpenRouter API.
**Deployment:** Vercel optimized. Assumes `https://prem-portfolio-drab.vercel.app` as base origin.
