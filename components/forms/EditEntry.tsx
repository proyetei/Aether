"use client"
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
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { FormSchema } from "@/lib/formValidation";
import {  bodyText, mainTitle, subTitle } from "@/fonts/font";
import { Input } from "../ui/input";
import SubmitButton from "../buttons/SubmitButton";
import { Database } from "@/database.types";

interface EditProps {
  post: Database['public']['Tables']['entries']['Row']
}

const EditEntry: FC<EditProps> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post.title,
      entry: post.entry,
      question: post?.question || '',
      selection: post.selection,
    },
  });

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true); 
    await axios.put(`/api/post/${post.id}`, {entry: data.entry, selection: data.selection, question: data?.question})
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
              <FormControl>
                <Textarea
                  placeholder="Begin journaling..."
                  className="h-[300px] rounded-sm outline-slate-400 bg-[#19172c] text-[#a8b0d3] px-3 py-1.5 focus:outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <div className="mt-6 flex flex-row items-center justify-center gap-4 mb-10">
            <button onClick={() => onSubmit}>
            <SubmitButton placeholder="Confirm changes" />
            </button>
            <button onClick={() => router.back()}>
            <SubmitButton placeholder="Cancel" />
            </button>
          </div>
        </form>
      </Form>
      </div>
    </div>
  );
}

export default EditEntry
