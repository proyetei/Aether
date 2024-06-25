"use client"
import { Entry } from "@prisma/client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { FormSchema } from "@/lib/formValidation";
import {  bodyText, mainTitle, subTitle } from "@/fonts/font";

interface EditProps {
  post: Entry
}

const EditEntry: FC<EditProps> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      entry: post.entry,
      mood: post?.mood || '',
      selection: post.selection,
    },
  });

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true); 
    await axios.put(`/api/post/${post.id}`, {entry: data.entry, selection: data.selection, mood: data?.mood})
      .then((response) => {
        console.log("Success!", response);
      })
    } catch(error)  {
        console.error("API Request Error:", error);
        toast({
          title: "Error",
          description:
            "An error occurred while submitting your journal. Please try again.",
        });
      } finally {setLoading(false);}
      router.push(`/explore`);
  }

  return (
    <div className=" items-center justify-center mb-8">
      <div> 
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >

          {/* EDIT ENTRY SECTION */}
          <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormLabel> 
                <div className={`bg-slate-900 ${bodyText.className} p-4 hover:drop-shadow-glow rounded-lg`}> <span className=" md:text-base text-sm text-cyan-100"> You can begin journaling here. For the most accurate analysis, we recommend journaling both personal life and dream journaling on the same day. </span> </div> </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Begin journaling..."
                  className="h-[300px] rounded-sm border-none bg-slate-800 px-3 py-1.5 md:text-base text-sm text-slate-100 outline-none focus:outline-none"
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

          <div className="mt-6 flex items-center justify-center gap-4 mb-10">
            {/* <Button className="hover:drop-shadow-glow bg-pink-600" type="button" disabled={loading} variant="ghost" 
            onClick={() => 
              toast({description: "Journal updated successfully!",})}>
              Confirm Changes
            </Button> */}
            <div className="items-center justify-center text-center">
          <Button className="hover:drop-shadow-glow bg-pink-600" type="button" variant="ghost" disabled={loading}>
        Confirm changes
        </Button>
        </div>
            <Button className="hover:drop-shadow-glow bg-pink-600" type="button" disabled={loading} variant="ghost" onClick={() => router.back()}> Cancel </Button>
          </div>

        </form>
      </Form>
      </div>
    </div>
  );
}

export default EditEntry
