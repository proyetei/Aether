"use client"
import { Entry } from "@prisma/client"
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { subTitle } from "@/fonts/font";
import LoadingAnimation from "../animations/LoadingAnimation";
import { Loader2 } from "lucide-react";
const AetherButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>("No analysis yet.")
    const [entries, setEntries] = useState<Entry[]>([]);
    useEffect(() => {
        const fetchEntries = async () => {
            setIsLoading(true);
        try {
            const response = await axios.get('/api', {});
            setEntries(response.data);
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
            <div className="hover:drop-shadow-glow hover:scale-125">
                <button onClick={analyzeEntries}>
                    <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
                </button>
            </div>
            <div>
                <p> Click me! </p>
            </div>
            {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (
            <div className={`${subTitle.className} items-center justify-center`}>
                <>
                <p> Last Dream Entry: </p>
                <hr />
                <p>{lastDreamEntry }  </p>
                <br />
                <p> Last Experience Entry: </p>
                <hr />
                <p> {lastExperienceEntry} </p> 
                </>
            </div> )}
            <div className={`${subTitle.className} items-center justify-center`}>
                <p> Analysis Result: </p>
                <hr />
                {isLoading ? (
                <p className="flex items-center gap-2">
                Loading... <Loader2 className="animate-spin" />
                </p>
            ) : (analysisResult)}
            </div>
        </div>
    )
}

export default AetherButton