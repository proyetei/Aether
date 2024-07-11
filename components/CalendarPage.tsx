
import CalendarMood from "@/components/CalendarMood"
import { motion } from "framer-motion";
export default function CalendarPage(){
    return (
      <div className="min-h-screen">
        <div className="max-w-screen-lg mx-auto p-4 rounded-lg md:w-4/5 sm:w-11/12">
          <div className="items-center justify-center">
          <CalendarMood />
          </div>
        </div>
      </div>
    )
}