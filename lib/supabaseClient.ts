import { auth, useUser } from '@clerk/nextjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';



// takes an argument of supabaseToken and takes two keys of the API keys, and then we pass the access token to make the requests
 export const supabaseClient = (supabaseToken: string): SupabaseClient => {
// export const supabaseClient = async(): Promise<SupabaseClient<any, "public", any>> => {
  const { userId, getToken } = auth();
  // const supabaseToken = await getToken({ template: "supabase"});
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
    }
  );

  return supabase;
};
