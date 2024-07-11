"use client"
import React, { useEffect, useState } from "react"
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
import { redirect, useRouter } from "next/navigation"
import { FormSchema } from "@/lib/formValidation"
import { Input } from "../ui/input"
import { Entry, User} from "@prisma/client"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { currentUser } from '@clerk/nextjs/server';

const EntryForm: React.FC = () => {
  
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await axios.post("/api", {entry: data.entry, selection: data.selection, question: data?.question });
      await axios.post("/api/points", {} )
      await axios.get("/api", {});
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
        <div className="py-4 flex flex-cols-2 gap-4">
        <FormField
          control={form.control}
          name="selection"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={`bg-white/10 backdrop-blur-sm p-4 text-md hover:drop-shadow-blue rounded-lg text-cyan-100`}> Experience or a dream journal? **  </div> 
              </FormLabel>
              {/* Set the value that was chosen in order to successfully send to database*/}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger className="text-slate-900 bg-pink-300">
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
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={`bg-white/10 backdrop-blur-sm p-4 text-md hover:drop-shadow-blue rounded-lg text-cyan-100`}> What is something you are proud of or grateful for today? </div> 
              </FormLabel>
              <FormControl>
                <Input placeholder="Your answer" className="md:w-[500px] text-slate-900 bg-pink-300" {...field} />
                </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        </div>
        <div className="items-center justify-center text-center">
          <Button className="bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-blue hover:scale-125" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
export default EntryForm