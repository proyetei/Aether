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

const EntryForm: React.FC = () => {
  
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
                <div className={`bg-white/15 backdrop-blur-xl ${subTitle.className} p-4 rounded-lg drop-shadow-blue md:text-lg text-md`}> 
                Begin your journaling adventure here! Collect 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-400"> +3 points </span> 
                  per entry and
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-400"> +5 points </span> in total for writing a response journal to a question. 
                </div> 
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Begin journaling..."
                  className="h-[300px] rounded-sm border-none bg-zinc-900 px-3 py-1.5 md:text-base text-sm outline-none focus:outline-none"
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
            <FormItem className="md:w-[200px] w-2/5">
              <FormLabel> 
                <div className={`bg-white/15 backdrop-blur-xl p-4 text-md drop-shadow-blue rounded-lg`}> Category*  </div> 
              </FormLabel>
              {/* Set the value that was chosen in order to successfully send to database*/}
              <Select onValueChange={ (value) => {field.onChange; setSelectedCategory(value);} } defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-zinc-900">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-zinc-900 text-indigo-200">
                <SelectItem value="Dream">Dream</SelectItem>
                <SelectItem value="Experience">Experience</SelectItem>
                <SelectItem value="Question">Q/A</SelectItem>
              </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        {selectedCategory === "Question" && (
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                <div className={`bg-white/15 backdrop-blur-xl p-4 text-md drop-shadow-blue rounded-lg`}> Answer question for +5 pts  </div> 
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "md:w-[400px] w-full justify-between",
                        !field.value && "bg-zinc-900"
                      )}
                    >
                      {field.value
                        ? questionBank.map((q) => q.question)
                        : "Select question"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="md:w-[400px] w-52 p-0 bg-zinc-900 text-indigo-200">
                  <ScrollArea className="h-72 md:w-[400px] w-52 rounded-md border">
                    
                    {questionBank.map((q, index) => (
                        <div key={index} className="p-2 hover:bg-zinc-700 cursor-pointer text-sm"
                        onClick = {() => {
                          form.setValue("question", q.question);
                          form.trigger("question"); // Trigger validation for question field
                        }}
                      >
                          {q.question}
                        </div>
                      ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        )}
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