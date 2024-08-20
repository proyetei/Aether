"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { subTitle } from "@/fonts/font"
import { redirect, useRouter } from "next/navigation"
import { FormSchema } from "@/lib/formValidation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SubmitButton from "../buttons/SubmitButton"
import { Input } from "../ui/input"
import { useUser, useSession } from "@clerk/nextjs"
import { createClient } from '@supabase/supabase-js'
import { Database } from "@/database.types";


const EntryForm: React.FC = () => {
  
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const [selectedValue, setSelectedValue] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

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

  const client = createClerkSupabaseClient()
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {

      if (!user) {
        return redirect("/");
      }

      await client.from('entries').insert([
        {title: data.title, entry: data.entry, selection: data.selection, question: data?.question, user_id: user.id }
      ])

      console.log("Here are your form values:", data.title, data.entry, data.selection, data?.question, user.id )

      // await client.from('users').update([{userPoints: user.userPoints + 3,}]);


      form.reset();
      router.push("/explore")
      toast({
        title: "Submitted!",
      })
    } catch(error: any){
      console.error("API Request Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting your entry. Please try again.",
        duration: 5000,
      });
    }
  }
  return (
    <div className=" items-center justify-center md:p-12 px-4">

      <p className={` ${subTitle.className} md:text-xl text-base text-violet-500`}>You will be awarded +5 points! </p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={` ${subTitle.className} pb-2 md:p-4 rounded-lg text-lg`}> 
                Please enter a title* (25 characters max.)
                </div> 
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Title..."
                  className="md:w-2/5 w-full rounded-sm border-indigo-600 border-2 bg-white/10 backdrop-blur-xl backdrop-saturate-200 text-white/90 px-3 py-1.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={` ${subTitle.className} pb-2 md:p-4 rounded-lg text-lg`}> 
                Journal entry* (250 characters max.)
                </div> 
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Begin journaling..."
                  className="md:h-[400px] h-[350px] rounded-sm border-indigo-600 border-2 bg-white/10 backdrop-blur-xl backdrop-saturate-200 text-white/90 px-3 py-1.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex md:flex-cols-2 flex-col gap-4">
        <FormField
          control={form.control}
          name="selection"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className={`${subTitle.className}`}> Select Category* </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-8"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Dream" onClick={() => setSelectedValue(false)} />
                    </FormControl>
                    <FormLabel className="font-bold" >
                      Dream
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Event" onClick={() => setSelectedValue(true)}/>
                    </FormControl>
                    <FormLabel className="font-bold" >
                      Event or Q&A
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={` ${subTitle.className} pb-2 md:p-4 rounded-lg text-lg`}>
                What are three things you <span className="text-violet-500"> love </span> about yourself? (Optional, 100 characters max.)
                </div> 
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Answer here"
                  className="md:w-4/5 w-full h-[200px] rounded-sm border-indigo-600 border-2 bg-white/10 backdrop-blur-xl backdrop-saturate-200 text-white/90 px-3 py-1.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="items-center justify-center text-center pt-6">
          <SubmitButton placeholder="Submit entry" />
        </div>
      </form>
    </Form>
    </div>
  )
}
export default EntryForm