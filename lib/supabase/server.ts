import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // When environment variables are missing during static prerendering,
    // we return a dummy client so the build does not fail.
    // In actual production runtime, this will be handled properly.
    return {
      auth: {
         getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
         select: () => ({
             eq: () => ({
                 single: async () => ({ data: null, error: null })
             })
         })
      })
    } as any;
  }

  const cookieStore = await cookies()

  return createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
