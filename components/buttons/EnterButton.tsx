import Link from "next/link"
import { subTitle } from "@/fonts/font"
import { BsJournalText } from "react-icons/bs";
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
export default function EnterButton(){
    const [loading, setLoading] = useState(false);
    return( 
    <div className="relative inline-flex group items-center justify-center mt-4 md:px-4 px-2 py-2 md:py-4">
      <div className={` ${loading ? 'pointer-events-none' : 'cursor-pointer'} absolute transition-all 
      duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] 
      rounded-sm blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt`} 
      onClick={() => setLoading(true)}></div>
      <div className="relative inline-flex items-center justify-center px-4 md:py-4 py-3 md:text-base text-md
      font-bold text-white transition-all duration-200 bg-gray-900 
      font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 " role="button" >
        <BsJournalText className=" md:text-xl" />
        <p className={`${subTitle.className} px-2`}>{" ADD "}</p>
      </div>
    </div>

        
    )
}