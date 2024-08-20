import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Display from "./Display";
import { subTitle } from "@/fonts/font";
import { Loader2 } from "lucide-react";
import { Database } from "@/database.types";
import { createClient } from '@supabase/supabase-js'
import { useSession, useUser } from '@clerk/nextjs'

type Entries = Database['public']['Tables']['entries']['Row'];
const TabComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [dreams, setDreams] = useState<Entries[] | null>([]);
  const [journal, setJournal] = useState<Entries[] | null>([]);
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

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {

        const { data: filteredDreams } = await client.from("entries").select().eq('selection', 'Dream');
        const { data: filteredJournal } = await client.from("entries").select().eq('selection', 'Event');

        setDreams(filteredDreams);
        setJournal(filteredJournal);
        console.log("filtered dreams ==", filteredDreams);
        console.log("filtered journal ==", filteredJournal);
      } catch (error) {
        console.error("Error fetching journal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <Tabs defaultValue="experience">
      <TabsList className={`flex items-center justify-center gap-8 w-full bg-transparent ${subTitle.className}`}>
        {/* JOURNAL */}
        <TabsTrigger value="experience"> Event/Q&A </TabsTrigger>
        <TabsTrigger value="dream"> Dream </TabsTrigger>
      </TabsList>
      <TabsContent value="experience">
        <Card>
          <CardContent className="space-y-2 ">
            {isLoading ? (
              <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {journal === null ? (
                  <p> No journals yet. Click "add new" to add one. </p>
                ) : (
                  <Display entries={journal} />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      {/* DREAM */}
      <TabsContent value="dream">
        <Card>
          <CardContent className="space-y-2">
            {isLoading ? (
              <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {dreams === null ? (
                  <p> No dreams yet. Click "add new" to add one. </p>
                ) : (
                  <Display entries={dreams} />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabComponent;
