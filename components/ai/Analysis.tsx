import AetherButton from "./AetherButton";
import { mainTitle, subTitle } from "@/fonts/font";
export default function Analysis(){
    return(
        <div className="min-h-screen flex md:px-16 p-4 pt-6 items-start justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl drop-shadow-lightblue">
            <p className={`${mainTitle.className} text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}> Create Analysis </p>
            <AetherButton />
            </div>
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl drop-shadow-lightblue">
            <p className={`${subTitle.className} text-xl`}> Most recent image generated </p>
            </div>             
            </div>

        </div>
    )
}