import { cn } from "@/lib/utils"
import { poppins, subTitle } from "@/fonts/font"
export default function LandingText(){
    return(
        <div
        className={cn(
          "text-base md:text-lg text-cyan-100 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          subTitle.className
        )}
      >
        A <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400"> smart AI psychological analysis journaling application </span> aimed towards improving mental health through amplifying dreams seen at night and personal life events. The name Aether is inspired by the ancient concept of aether as the pure, bright air that the gods breathed in the highest realms. Just as aether represents clarity and elevation, our app provides clarity and elevation understanding your own psyche.
      </div>
    )
}