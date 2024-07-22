import AetherButton from "./AetherButton";
import { subTitle } from "@/fonts/font";
export default function Analysis(){
    return(
        <div className="min-h-screen flex flex-col md:px-16 p-4">
            <p className={`${subTitle.className} text-2xl md:text-3xl font-bold mb-2 text-indigo-400`}> CREATE ANALYSIS </p>
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