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
            <p className={`${subTitle.className} text-xl`}> Rules of the game </p>
            <p> Collect 9 points to reach LEVEL 2</p>
            <p> Unlock Text Analysis: Powered by AI, Receive comprehensive report analysis into your own pysche by finding a correlation between your event and dream entries. </p>
            <p> Collect 27 points to reach LEVEL 3 </p>
            <p> Collect 50 points to reach LEVEL 4 </p>
            <p> Unlock 5 Image Generation credits: Powered by AI, generate images based on a common theme between your event and dream entries. </p>
            <p> Collect 100 points to reach LEVEL 5 and unlock 50 image generation credits </p>
            </div>             
            </div>

        </div>
    )
}