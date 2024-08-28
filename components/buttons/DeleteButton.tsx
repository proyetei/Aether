import { Entry } from "@prisma/client"
import React from "react"
import axios from "axios"
import { RiDeleteBin2Fill, } from "react-icons/ri";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState, useCallback} from "react"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Database } from '@/database.types';
import { createClient } from '@supabase/supabase-js'
import { useSession, useUser } from '@clerk/nextjs'
interface DeleteEntryProps{
    post: Database['public']['Tables']['entries']['Row']
}
const DeleteButton: React.FC<DeleteEntryProps> = ({ post }) => {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const router = useRouter();
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

    const handleSubmission = useCallback(async () => {
        setLoading(true);
        try {
            await client.from("entries").delete().eq('id', post.id);
            router.refresh();
            toast({ description: "Journal deleted successfully!" });
        } catch (error) {
            console.error("API Request Error:", error);
            toast({
                title: "Error",
                description: "An error occurred while submitting your journal. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    }, [post.id, router, toast]);

    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm"> <RiDeleteBin2Fill className="text-xl" /> </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-slate-900">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription> This will permanently delete your post!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="text-slate-900">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ (handleSubmission)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
export default DeleteButton