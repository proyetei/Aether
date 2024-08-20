

import { motion } from "framer-motion";
import PieChartUI from "../PieChartUI";
import CalendarMood from "./CalendarMood";
export default function CalendarPage(){
    return (
      <div className="min-h-screen overflow-hidden">
        <div className="max-w-screen-lg mx-auto p-4 rounded-lg md:w-4/5 sm:w-11/12">
          <div className="flex flex-col gap-8 items-center justify-center">
          <CalendarMood />
          <PieChartUI />
          </div>
        </div>
      </div>
    )
}