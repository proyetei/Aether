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
import { questionBank } from "@/lib/data"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SubmitButton from "../buttons/SubmitButton"
import QuestionGenerator from "../QuestionGenerator"

const EntryForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const promptAnswered = !!data.question; // Simplified boolean check
      await axios.post("/api", {entry: data.entry, selection: data.selection, question: data?.question });
      await axios.post("/api/points", {promptAnswered} )
      await axios.get("/api", {});
      form.reset();
      router.push("/explore")
      toast({
        title: "Submitted!",
      })
      closeModal();
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
                <div className={` ${subTitle.className} p-4 rounded-lg md:text-base text-md`}> 
                Begin your journaling adventure here! Collect 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-400"> +3 points </span> 
                  per entry and
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-400"> +5 points </span> in total for writing a response journal to a question. 
                </div> 
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Begin journaling..."
                  className="h-[300px] rounded-sm border-none bg-transparent backdrop-blur-xl text-slate-300 px-3 py-1.5 md:text-base text-sm outline outline-indigo-600 focus:outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-cols-2 gap-4">
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
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Dream" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Dream
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Experience" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Experience
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Q/A" />
                    </FormControl>
                    <FormLabel className="font-normal">Q/A</FormLabel>
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
            <FormItem className="space-y-3">
              <FormControl>
                <QuestionGenerator />
              </FormControl>
              </FormItem>
          )}
        />

        </div>
        <div className="items-center justify-center text-center">
          <SubmitButton placeholder="Submit entry" />
        </div>
      </form>
    </Form>
    </div>
  )
}
export default EntryForm