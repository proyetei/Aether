"use client"
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import PieChartUI from "./PieChartUI";
import { Calendar } from "@/components/ui/calendar"
import { subTitle } from "@/fonts/font";
import SubmitButton from "../buttons/SubmitButton";
import { toast } from "../ui/use-toast";
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";


interface MoodEntry {
  mood: string;
  moodDate: string;
}

const moodToEmojiMap: { [key: string]: string } = {
  "very happy": "🤩",
  "happy": "🙂",
  "neutral/meh": "😐",
  "sad": "🙁",
  "angry": "😡",
};

const moods = [
  { mood: "very happy", emoji: "🤩" },
  { mood: "happy", emoji: "🙂" },
  { mood: "neutral/meh", emoji: "😐" },
  { mood: "sad", emoji: "🙁" },
  { mood: "angry", emoji: "😡" },
];

export default function CalendarMood() {
  const [dateSelected, setDateSelected] = useState<Date | undefined>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodMap, setMoodMap] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentDate = new Date();
  const { user } = useUser();
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

  const handleMoodClick = (mood: string | null) => {
    setSelectedMood(mood);
    if (mood != null){
      setTimeout(() => {
        toast({description: `Mood selected: ${mood}`,});
      }, 10);
    } else {
      setTimeout(() => {
        toast({description: `Mood was reset`, duration:5});
      }, 10);      
    }
}

useEffect(() => {
  const fetchExistingMoods = async () => {
    try {
      if (!user) {
        return redirect("/");
      }
      const {data : response } = await client.from("calendarMood").select();
      const existingMoods = response.reduce((acc: { [key: string]: string }, entry: MoodEntry) => {
        acc[new Date(entry.moodDate).toDateString()] = moodToEmojiMap[entry.mood];
        return acc;
      }, {});
        setMoodMap(existingMoods);
    } catch (error) {
        console.error("API Request Error:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching existing moods. Please try again.",
        });
      }
    };
    fetchExistingMoods();
  }, []);

  const onSubmit = async () => {
    if (!selectedMood) {
      alert("Please select a mood before submitting.");
      return;
    }
    if (dateSelected && dateSelected.getTime() > currentDate.getTime()) {
      alert("Selected Date cannot be greater than the current date.");
      return;
    }
    if (!user) {
      return redirect("/");
    }

    try {
      setLoading(true);
      const {data: existingMoods} = await client.from("calendarMood").select();
      await client.from('calendarMood').insert([
        {mood: selectedMood, moodDate: dateSelected, userId: user.id }
      ])
      // await axios.post(`/api/calendar`, { mood: selectedMood, moodDate: dateSelected });
      toast({
        title: "Success",
        description: "Your mood entry has been submitted successfully.",
      });

      setMoodMap((prev) => ({
        ...prev,
        [dateSelected!.toDateString()]: moodToEmojiMap[selectedMood],
      }));

      router.refresh();
    } catch (error) {
      console.error("API Request Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting your mood entry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[4fr_1fr] gap-4 p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className={`${subTitle.className} text-md text-[#a8b0d3]`}>
          Select a date and select your mood on that respective date
        </p>
        <div className="mx-auto items-center justify-center">
          <Calendar
            moodMap={moodMap}
            mode="single"
            selected={dateSelected}
            onSelect={setDateSelected}
            className="rounded-md border"
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={loading}
        >
          <SubmitButton placeholder={loading ? "Submitting..." : "Submit"} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-3xl">
        {moods.map(({ mood, emoji }) => (
          <div
            key={mood}
            className={`hover:scale-125 ${selectedMood === mood ? "scale-125 drop-shadow-white" : ""}`}
            onClick={() => handleMoodClick(mood)}
          >
            {emoji}
          </div>
        ))}
        <div className="hover:scale-125" onClick={() => handleMoodClick(null)}>🔄</div>
      </div>
    </div>
  );
}
