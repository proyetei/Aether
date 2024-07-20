import AetherButton from "./AetherButton";
import { mainTitle } from "@/fonts/font";
export default function Analysis(){
    return(
        <div className="min-h-screen flex flex-col md:px-16 p-4 pt-6 text-center">
            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl drop-shadow-lightblue">
            <p className={`${mainTitle.className} text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}> Create Analysis </p>
            <AetherButton />
            </div>
        </div>
    )
}