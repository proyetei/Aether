"use client"
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "./ui/use-toast";
import PieChartUI from "./PieChartUI";
import { Calendar } from "@/components/ui/calendar"


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
      const response = await axios.get(`/api/calendar`);
      const existingMoods = response.data.reduce((acc: { [key: string]: string }, entry: MoodEntry) => {
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

    try {
      setLoading(true);
      const existingMoods = await axios.get(`/api/calendar`);
      const dateExists = existingMoods.data.some((entry: MoodEntry) => new Date(entry.moodDate).getTime() === dateSelected?.getTime());

      await axios.post(`/api/calendar`, { mood: selectedMood, moodDate: dateSelected });
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
        <p className="text-md text-[#a8b0d3]">
          Select a date and select your mood on that respective date
        </p>
        <div className="mx-auto items-center justify-center">
          <Calendar
            moodMap={moodMap}
            mode="single"
            selected={dateSelected}
            onSelect={setDateSelected}
            className="rounded-md border"
            styles={{ head_cell: { width: "30px" } }}
          />
        </div>
        <Button
          className="hover:scale-125 bg-gradient-to-r from-pink-500 to-blue-400"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-3xl">
        {moods.map(({ mood, emoji }) => (
          <div
            key={mood}
            className={`hover:scale-125 ${selectedMood === mood ? "scale-125" : ""}`}
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
