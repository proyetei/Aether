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
import { useQuestion } from "../QuestionContext"

const EntryForm: React.FC = () => {
  
  const router = useRouter();
  const { toast } = useToast();
  const { selectedQuestion } = useQuestion();
  const [selectedValue, setSelectedValue] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const promptAnswered = !!data.question; // Simplified boolean check
      await axios.post("/api", {entry: data.entry, selection: data.selection, question: selectedQuestion });
      await axios.post("/api/points", {promptAnswered} )
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
    <div className=" items-center justify-center md:p-12 px-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={` ${subTitle.className} pb-2 md:p-4 rounded-lg text-lg`}> 
                Journal entry
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
          { selectedValue ? <QuestionGenerator /> : null }
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