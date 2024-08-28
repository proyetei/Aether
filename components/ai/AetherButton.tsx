"use client"

import { Entry } from "@prisma/client";
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
import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/nextjs";

type Entries = Database["public"]["Tables"]["entries"]["Row"];

const AetherButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>("No analysis yet.");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [getPoints, setUserPoints] = useState<number | null>(null);

  const [dreams, setDreams] = useState<Entries[] | null>([]);
  const [journal, setJournal] = useState<Entries[] | null>([]);
  
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });

            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const {data: allEntries} = await client.from("entries").select();
        const { data: filteredDreams } = await client
          .from("entries")
          .select()
          .eq("selection", "Dream");
        const { data: filteredJournal } = await client
          .from("entries")
          .select()
          .eq("selection", "Event");

        setDreams(filteredDreams);
        setJournal(filteredJournal);
        setUserPoints((allEntries?.length ?? 0)* 5);
        console.log("filtered dreams ==", filteredDreams);
        console.log("filtered journal ==", filteredJournal);
      } catch (error) {
        console.error("Error fetching journal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const lastDreamEntry = dreams && dreams.length > 0 ? dreams[dreams.length - 1]?.entry : null;
  const lastJournalEntry = journal && journal.length > 0 ? journal[journal.length - 1]?.entry : null;

  const analyzeEntries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/analyze", {
        dream: lastDreamEntry,
        journal: lastJournalEntry,
      });
      setAnalysisResult(response.data.content);
      console.log(response.data.content);
    } catch (error) {
      console.error("Error during analysis", error);
      setAnalysisResult("Failed to perform analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        {((!lastDreamEntry || !lastJournalEntry) && getPoints !== null && calculateLevels(getPoints)[2] === true) ? (
          <>
            <button disabled={true} className="opacity-50">
              <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
            </button>
            <p className="text-slate-400 md:text-base text-md">
              One of the entries is missing, cannot perform analysis
            </p>
          </>
        ) : getPoints !== null && calculateLevels(getPoints)[2] === true && calculateLevels(getPoints)[3] === false ? (
          <>
            <button onClick={analyzeEntries} className="hover:drop-shadow-blue hover:scale-125">
              <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
            </button>
            <p>Click for text analysis</p>
          </>
        ) : getPoints !== null && calculateLevels(getPoints)[2] === true && calculateLevels(getPoints)[3] === true ? (
          <div className="flex flex-row gap-4 items-center justify-center">
            <div>
              <button onClick={analyzeEntries} className="hover:drop-shadow-blue hover:scale-125">
                <Image src="/aether-bot.svg" alt="Aether bot button" height={80} width={80} />
              </button>
              <p>Click for text analysis</p>
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
            <p className="text-red-400 text-md">
              Please have 2 entries first before performing text analysis 
            </p>
          </>
        )}
      </div>
      {isLoading ? (
        <p className="flex items-center gap-2">
          Loading... <Loader2 className="animate-spin" />
        </p>
      ) : (
        <div className="text-left">
          <p className={`${subTitle.className}`}>Last Dream Entry</p>
          <Separator className="bg-slate-500" />
          <p className="text-[#a8b0d3] md:text-base text-md">{lastDreamEntry}</p>
          <br />
          <p className={`${subTitle.className}`}>Last Experience Entry</p>
          <Separator className="bg-slate-500" />
          <p className="text-[#a8b0d3] md:text-base text-md">{lastJournalEntry}</p>
          <br />
          <p className={`${subTitle.className}`}>Analysis Result</p>
          <Separator className="bg-slate-500" />
          <p className="text-[#a8b0d3] md:text-base text-md">{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default AetherButton;
