"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {  bodyText, subTitle } from "@/fonts/font"
import { useRouter } from "next/navigation"
import { FormSchema } from "@/lib/formValidation"
 
export default function EntryForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const apiRoute = '/api'
  const router = useRouter();
 
  const formEntry = form.getValues();


  const handleSubmission = () => {
    console.log("Message entry:", formEntry);
  }
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post(apiRoute, {entry: data.entry, selection: data.selection, mood: data?.mood});
      await axios.get(apiRoute, {});
      form.reset();
      router.push("/explore")
      toast({
        title: "Success!",
        description: "Your journal was submitted",
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
    <div className=" items-center justify-center">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={`bg-white/10 backdrop-blur-sm ${bodyText.className} p-4 rounded-lg`}> <span className=" md:text-md text-sm text-cyan-100"> You can begin journaling here. For the most accurate analysis, we recommend journaling both personal life and dream journaling on the same day. </span> </div> </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Begin journaling..."
                  className="h-[300px] rounded-sm border-none bg-zinc-900 px-3 py-1.5 md:text-base text-sm text-slate-100 outline-none focus:outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4 grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="selection"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={`bg-white/10 backdrop-blur-sm p-4 text-md hover:drop-shadow-glow rounded-lg text-cyan-100`}> Experience or a dream journal? **  </div> 
              </FormLabel>
              {/* Set the value that was chosen in order to successfully send to database*/}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger className="w-[180px] text-slate-900 bg-pink-300">
                    <SelectValue placeholder="Experience/Dream?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-black bg-pink-300">
                  <SelectItem value="Dream">Dream</SelectItem>
                  <SelectItem value="Experience">Experience</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={`bg-white/10 backdrop-blur-sm p-4 text-md hover:drop-shadow-glow rounded-lg text-cyan-100`}> Whats your mood today? </div> 
              </FormLabel>
              {/* Set the value that was chosen in order to successfully send to database*/}
              <Select onValueChange={field.onChange} defaultValue={field?.value}>
              <FormControl>
                  <SelectTrigger className="w-[180px] text-slate-900 bg-pink-300">
                    <SelectValue placeholder="I'm feeling..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-black bg-pink-300">
                <SelectItem value="Excited"> Excited </SelectItem>
                  <SelectItem value="Happy"> Happy </SelectItem>
                  <SelectItem value="Neutral"> Neutral </SelectItem>
                  <SelectItem value="Anxious"> Anxious </SelectItem>
                  <SelectItem value="Sad"> Sad </SelectItem>
                  <SelectItem value="Angry"> Angry </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        </div>
        <div className="items-center justify-center text-center">
          <Button className="bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-glow hover:scale-125" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
