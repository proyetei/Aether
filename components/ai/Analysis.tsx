import AetherButton from "./AetherButton";
import { mainTitle, subTitle } from "@/fonts/font";
export default function Analysis(){
    return(
        <div className="min-h-screen flex flex-col md:px-16 p-4">
            <p className={`${mainTitle.className} text-2xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}> Create Analysis </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl drop-shadow-lightblue">
            <AetherButton />
            </div>
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl drop-shadow-lightblue">
            <p className={`${subTitle.className} md:text-xl text-lg`}> Most recent image generated </p>
            </div>             
            </div>

        </div>
    )
}