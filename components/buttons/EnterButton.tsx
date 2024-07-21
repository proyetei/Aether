import Link from "next/link"
import { subTitle } from "@/fonts/font"
import { BsJournalText } from "react-icons/bs";
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
export default function EnterButton(){
    const [loading, setLoading] = useState(false);
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                <div className="relative inline-flex group items-center justify-center px-4 py-4">
        <div className={` ${loading ? 'pointer-events-none' : 'cursor-pointer'} absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt`} onClick={() => setLoading(true)}></div>
        <div
          className="relative inline-flex items-center justify-center px-4 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 "
          role="button" 
        >
          <BsJournalText className=" text-xl" />
          <p className={`${subTitle.className} px-2`}>{" ADD "}</p>
        </div>
      </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p> Add an entry </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
    )
}