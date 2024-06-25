"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "./ui/use-toast";
import PieChartUI from "./PieChartUI";
import { Calendar } from "@/components/ui/calendar"

export default function CalendarMood() {
    const [dateSelected, setDateSelected] = useState<Date | undefined>(new Date())
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const currentDate = new Date()
  
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
  const fetchExistingMoods = async () => {
    try {
        const response = await axios.get(`/api/calendar`);
        return response.data;
    } catch (error) {
        console.error("API Request Error:", error);
        toast({
            title: "Error",
            description: "An error occurred while fetching existing moods. Please try again.",
        });
        return [];
    }
};
  
    const onSubmit = async () => {
      if (!selectedMood) {
        alert("Please select a mood before submitting.");
        return; //abort
      } else if (dateSelected && dateSelected.getTime() > currentDate.getTime()) {
        alert("Selected Date cannot be greater than current date.");
        return; //abort
      }
  
      try {
        setLoading(true);
        const existingMoods = await fetchExistingMoods();
        const dateExists = existingMoods.some((entry: any) => new Date(entry.moodDate).getTime() === dateSelected?.getTime());

        if (dateExists) {
            alert("Date selected cannot be same as one previously selected.");
            return; // abort
        }
        const response = await axios.post(`/api/calendar`, { mood: selectedMood, moodDate:dateSelected });
        console.log("Success!", response);
        toast({
          title: "Success",
          description: "Your mood entry has been submitted successfully.",
          duration: 500,
        });
        router.refresh()
      } catch (error) {
        console.error("API Request Error:", error);
        toast({
          title: "Error",
          description:
            "An error occurred while submitting your mood entry. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div className="grid grid-cols-2 py-8 px-4">
          <div className="grid md:grid-cols-[4fr_1fr] grid-cols-1 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="md:text-md text-sm">
                Select a date and select your mood on that respective date
              </p>
              <div className="mx-auto items-center justify-center">
                <Calendar mode="single" selected={dateSelected} onSelect={setDateSelected} className="rounded-md border" styles={{head_cell: {width: "30px",},}}/>
              </div>
              <Button className="hover:scale-125 bg-gradient-to-r from-pink-500 to-blue-400" onClick={onSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-3xl">
              <div
                className={`hover:scale-125 ${selectedMood === "very happy" ? "scale-125" : ""}`}
                onClick={() => handleMoodClick("very happy")}
              >🤩</div>
              <div
                className={`hover:scale-125 ${selectedMood === "happy" ? "scale-125" : ""}`}
                onClick={() => handleMoodClick("happy")}
              >🙂</div>
              <div
                className={`hover:scale-125 ${selectedMood === "neutral/meh" ? "scale-125" : ""}`}
                onClick={() => handleMoodClick("neutral/meh")}
              >😐</div>
              <div
                className={`hover:scale-125 ${selectedMood === "sad" ? "scale-125" : ""}`}
                onClick={() => handleMoodClick("sad")}
              >🙁</div>
              <div
                className={`hover:scale-125 ${selectedMood === "angry" ? "scale-125" : ""}`}
                onClick={() => handleMoodClick("angry")}
              >😡</div>
              {/* unselect logic here*/}
              <div className="hover:scale-125" onClick={() => handleMoodClick(null)}> 🔄 </div>
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center">
            {/* <div className="text-3xl"> Pie chart data </div> */}
            {/* <PieChartUI /> */}

          </div>
        </div>
    );
  }