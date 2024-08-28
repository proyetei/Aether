"use client"
import Edit from "@/components/Edit";
import { FC } from "react";
import { Metadata } from "next";
import { createClient } from '@supabase/supabase-js'
import { useSession, useUser } from '@clerk/nextjs'
import { Database } from "@/database.types";
interface pageProps{
    params: {
      postId: number
    }
}

// export const metadata: Metadata = {
//   title: "Edit Journal",
// };
// pass the postId parameters to the page to be able to see the content
const page: FC<pageProps> = async ({ params }) => {
  // The `useSession()` hook will be used to get the Clerk session object
  const { session } = useSession()

// Create a custom supabase client that injects the Clerk Supabase token into the request headers
function createClerkSupabaseClient() {
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

  const client = createClerkSupabaseClient();
  const { postId } = params;
  const { data } = await client
  .from('entries')
  .select()
  .eq('id', postId).limit(1).single()


  if (!data) {
    return (
      <div>
        Not found!!!
      </div>
    )
  }
  return (
      <div>
        <Edit post={data} />
      </div>
    )
  }
  export default page;