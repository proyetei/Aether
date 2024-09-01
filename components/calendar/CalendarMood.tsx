"use client";

import { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { subTitle } from "@/fonts/font";
import SubmitButton from "../buttons/SubmitButton";
import { toast } from "../ui/use-toast";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


interface MoodEntry {
  mood: string | null;
  moodDate: string;
}

const moodToEmojiMap: { [key: string]: string } = {
  "very happy": "🤩",
  happy: "🙂",
  "neutral/meh": "😐",
  sad: "🙁",
  angry: "😡",
};

const moods = [
  { mood: "very happy", emoji: "🤩" },
  { mood: "happy", emoji: "🙂" },
  { mood: "neutral/meh", emoji: "😐" },
  { mood: "sad", emoji: "🙁" },
  { mood: "angry", emoji: "😡" },
];

type ChartData = {
  month: string;
  excited: number;
  happy: number;
  neutral: number;
  sad: number;
  angry: number;
};
const moodMapping: { [key: string]: keyof ChartData } = {
  'very happy': 'excited',
  'happy': 'happy',
  'neutral/meh': 'neutral',
  'sad': 'sad',
  'angry': 'angry'
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

type MoodData = Database['public']['Tables']['calendarMood']['Row'];


export default function CalendarMood() {
  const [dateSelected, setDateSelected] = useState<Date | undefined>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodMap, setMoodMap] = useState<{ [key: string]: string }>({});
  const [processedMoodData, setProcessedMoodData] = useState<ChartData[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentDate = new Date();
  const { user } = useUser();
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });

            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  const client = createClerkSupabaseClient();

const chartConfig = {
    excited: {
      label: "Excited",
      color: "#2563eb",
    },
    happy: {
      label: "Happy",
      color: "#60a5fa",
    },
    neutral: {
      label: "Neutral",
      color: "#60a5fa",
    },
    sad: {
      label: "Sad",
      color: "#60a5fa",
    },
    angry: {
      label: "Angry",
      color: "#60a5fa",
    },
} satisfies ChartConfig

  const handleMoodClick = (mood: string | null) => {
    setSelectedMood(mood);
    setTimeout(() => {
      toast({ description: `Mood selected: ${mood ?? "reset"}` });
    }, 10);
  };

  useEffect(() => {
    const fetchExistingMoods = async () => {
      try {
        if (!user) {
          return redirect("/");
        }
        const { data: response, error } = await client.from("calendarMood").select();
        
        if (error) {
          throw error;
        }
  
        if (response) {
          const existingMoods = response.reduce(
            (acc: { [key: string]: string }, entry: { mood: string | null; moodDate: string }) => {
              if (entry.mood) {
                acc[new Date(entry.moodDate).toDateString()] = moodToEmojiMap[entry.mood];
              }
              return acc;
            },
            {} as { [key: string]: string }
          );
          setMoodMap(existingMoods);

          const chartData = months.map((month, index) => {
            const monthlyData = response.filter(entry => {
              const entryDate = new Date(entry.moodDate);
              return entryDate.getUTCMonth() === index;
            });

            const moodCounts = monthlyData.reduce((acc, entry) => {
              const mood = moodMapping[entry.mood || 'neutral'] as Exclude<keyof ChartData, 'month'>;
              acc[mood] = (acc[mood] || 0) + 1;
              return acc;
            }, { excited: 0, happy: 0, neutral: 0, sad: 0, angry: 0 });

            return {
              month: month,
              ...moodCounts
            };
          });

          setProcessedMoodData(chartData);          
        }

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
      await client.from("calendarMood").insert([
        { mood: selectedMood, moodDate: dateSelected?.toISOString(), userId: user.id },
      ]);

      toast({
        title: "Success",
        description: "Your mood entry has been submitted successfully.",
      });

      setMoodMap((prev) => ({
        ...prev,
        [dateSelected!.toDateString()]: moodToEmojiMap[selectedMood!],
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
  <div className="min-h-screen overflow-hidden">
    <div className="max-w-screen-lg mx-auto p-4 rounded-lg md:w-4/5 sm:w-11/12">
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-center justify-center">
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
        <button onClick={onSubmit} disabled={loading}>
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
        <div className="hover:scale-125" onClick={() => handleMoodClick(null)}>
          🔄
        </div>
      </div>
    </div>
    {/* CHART REPORT */}
    <div className="flex flex-col items-center justify-start">
      <p className="text-4xl"> MOOD CHART </p>
      <p className="text-lg"> Tap on the chart to see more details. </p>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={processedMoodData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="excited" fill="var(--color-desktop)" radius={10} />
        <Bar dataKey="happy" fill="var(--color-mobile)" radius={10} />
        <Bar dataKey="neutral" fill="var(--color-mobile)" radius={10} />
        <Bar dataKey="sad" fill="var(--color-mobile)" radius={10} />
        <Bar dataKey="angry" fill="var(--color-mobile)" radius={10} />
      </BarChart>
    </ChartContainer>
    </div>
    </div>
    </div>
  </div>
  );
}
