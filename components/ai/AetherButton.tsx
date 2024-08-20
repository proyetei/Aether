"use client"
import { Entry } from "@prisma/client"
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { subTitle } from "@/fonts/font";
import LoadingAnimation from "../animations/LoadingAnimation";
import { Loader2 } from "lucide-react";
import { calculateLevels } from "@/lib/calculateLevels";
import ImageGenerateModal from "./ImageGenerateModal";
import { Button } from "../ui/button";
import { useDisclosure } from "@nextui-org/modal";
import { Separator } from "../ui/separator";
const AetherButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>("No analysis yet.")
    const [entries, setEntries] = useState<Entry[]>([]);
    const [getPoints, setUserPoints] = useState<number | null>(null);
    useEffect(() => {
        const fetchEntries = async () => {
            setIsLoading(true);
        try {
            const entriesResponse = await axios.get('/api', {});
            const pointsResponse = await axios.get("/api/points", {});
            setEntries(entriesResponse.data);
            setUserPoints(pointsResponse.data)
        } catch (error) {
            console.error("Error fetching journal:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchEntries();
    }, []);
    const filteredDreams = entries.filter((entry) => entry.selection === "Dream")
    const filteredExperience = entries.filter((entry) => entry.selection === "Experience")
    const lastDreamEntry = filteredDreams[filteredDreams.length -1]?.entry
    const lastExperienceEntry = filteredExperience[filteredExperience.length - 1]?.entry
    const analyzeEntries = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/analyze", {
                dream: lastDreamEntry,
                experience: lastExperienceEntry,
            })
            setAnalysisResult(response.data.content);
            console.log(response.data.content)
        }
        catch(error) {
            console.error("Error during analysis", error);
            setAnalysisResult("Failed to perform analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <div className=" flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center">
                {((!lastDreamEntry || !lastExperienceEntry) && getPoints !== null && calculateLevels(getPoints)[2] === true ) ? (
                    <>
                    <button disabled={true} className="opacity-50">
                        <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
                    </button> 
                    <p className="text-slate-400 md:text-base text-md"> One of the entries is missing, cannot perform analysis </p>
                    </>
                ) : (getPoints !== null && calculateLevels(getPoints)[2] === true && calculateLevels(getPoints)[3] === false) ? (
                    <>
                    <button onClick={analyzeEntries} className="hover:drop-shadow-blue hover:scale-125">
                        <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
                    </button>
                    <p> Click for text analysis </p>
                    </>
                ) : (getPoints !== null && calculateLevels(getPoints)[2] === true && calculateLevels(getPoints)[3] === true) ? (
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <div>
                        <button onClick={analyzeEntries} className="hover:drop-shadow-blue hover:scale-125">
                            <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
                        </button>
                        <p> Click for text analysis </p>
                        </div>
                        <div>
                            <ImageGenerateModal />
                        </div>
                    </div>
                ) : (
                    <>
                    <button disabled={true} className="opacity-50">
                        <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
                    </button>
                    <p className="text-red-400 text-md"> STOP! You havent reached level 2 yet! Please keep journaling to collect points :) </p>
                    </>
                )}
            </div>
            {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (
                <div className="text-left">
                    <p className={`${subTitle.className}`}> Last Dream Entry </p>
                    <Separator className="bg-slate-500"/>
                    <p className="text-[#a8b0d3] md:text-base text-md">{lastDreamEntry }  </p>
                    <br />
                    <p className={`${subTitle.className}`}> Last Experience Entry </p>
                    <Separator className="bg-slate-500"/>
                    <p className="text-[#a8b0d3] md:text-base text-md"> {lastExperienceEntry} </p>
                    <br /> 
                    <p className={`${subTitle.className}`}> Analysis Result </p>
                    <Separator className="bg-slate-500"/>
                    <p className="text-[#a8b0d3] md:text-base text-md">{analysisResult}  </p>
                </div>
             )}
        </div>
    )
}

export default AetherButton