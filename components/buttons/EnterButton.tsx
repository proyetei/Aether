import Link from "next/link"
import { subTitle } from "@/fonts/font"
import { BsJournalText } from "react-icons/bs";
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
export default function EnterButton(){
    const [loading, setLoading] = useState(false);
    return( 
      <div className={` rounded-lg bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] p-1`} 
      onClick={() => setLoading(true)}>
      <div className="relative inline-flex items-center justify-center px-4 md:py-4 py-3 md:text-base text-md
      font-bold text-white transition-all duration-200 bg-gray-900 
      font-pj rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 " role="button" >
        {loading ? (
          <>
          <BsJournalText className="md:text-2xl" />
          <p className={`${subTitle.className} px-4`}>Loading...</p>
          </>
        ) : (
          <>
            <BsJournalText className="md:text-2xl" />
            <p className={`${subTitle.className} px-4`}>ADD JOURNAL</p>
          </>
        )}
      </div>
      </div>

        
    )
}