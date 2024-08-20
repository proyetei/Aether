import { Database } from '@/database.types';
import { auth, useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'


export function createClerkSupabaseClient() {
  const { user } = useUser();
  const { getToken } = auth()
  // The `useSession()` hook will be used to get the Clerk session object
  const { session } = useSession()

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        // Get the custom Supabase token from Clerk
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: 'supabase',
          })

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers)
          headers.set('Authorization', `Bearer ${clerkToken}`)

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    },
  )
}