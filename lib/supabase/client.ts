import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
     return {
         auth: {
            signInWithPassword: async () => ({ error: { message: "Supabase not configured" } }),
            signUp: async () => ({ error: { message: "Supabase not configured" } }),
            signInWithOAuth: async () => ({ error: { message: "Supabase not configured" } }),
            resetPasswordForEmail: async () => ({ error: { message: "Supabase not configured" } }),
            updateUser: async () => ({ error: { message: "Supabase not configured" } }),
            signOut: async () => {},
         },
         from: () => ({
             update: () => ({
                 eq: async () => ({ error: { message: "Supabase not configured" } })
             })
         })
     } as any;
  }

  return createBrowserClient(url, key)
}
