"use client"
import { useState } from "react";
import { CalendarUI } from "./CalendarUI";
import { Button } from "./ui/button";
import { FaRegSmileBeam } from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegFaceMeh } from "react-icons/fa6";
import { FaRegFaceFrown } from "react-icons/fa6";
import { FaRegFaceAngry } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "./ui/use-toast";
import PieChartUI from "./PieChartUI";
export default function CalendarMood() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleMoodClick = (mood: string | null) => {
      setSelectedMood(mood);
      if (mood != null){
        setTimeout(() => {
          toast({description: `Mood selected: ${mood}`,});
        }, 10);
      } else {
        setTimeout(() => {
          toast({description: `Mood was reset`,});
        }, 10);      
      }
  }
  
    const onSubmit = async () => {
      if (!selectedMood) {
        alert("Please select a mood before submitting.");
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.post(`/api/calendar`, { mood: selectedMood });
        console.log("Success!", response);
        toast({
          title: "Success",
          description: "Your mood entry has been submitted successfully.",
        });
        router.push(`/explore`);
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
              <p className="text-md text-center">
                Select a date and select your mood on that respective date
              </p>
              <CalendarUI />
              <Button onClick={onSubmit} disabled={loading}>
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
          <div className=" flex flex-col">
            <div className="text-3xl"> Pie chart data </div>
            <PieChartUI />

          </div>
        </div>
    );
  }