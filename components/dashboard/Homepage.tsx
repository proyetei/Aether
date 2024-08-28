"use client";

import React from "react";
import { motion } from "framer-motion";
import { subTitle } from "@/fonts/font";
import { useEffect, useState } from "react";
import EnterButton from "../buttons/EnterButton";
import axios, { all } from "axios";
import { ClipLoader } from "react-spinners";
import { calculateLevels } from "@/lib/calculateLevels";
import Scoreboard from "./Scoreboard";
import CardFlip from "./CardFlip";
import { cardData } from "@/lib/data";
import { useRouter, redirect } from "next/navigation";
import { Database } from "@/database.types";
import { createClient } from '@supabase/supabase-js'
import { useSession, useUser } from '@clerk/nextjs'

type Entries = Database['public']['Tables']['entries']['Row'];
const Homepage: React.FC = () => {
  const [getPoints, setUserPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [dreamsCount, setDreamsCount] = useState<number>(0);
  const [journalCount, setJournalCount] = useState<number>(0);

  const { session } = useSession();


  function createClerkSupabaseClient() {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: 'supabase',
            })

            const headers = new Headers(options?.headers)
            headers.set('Authorization', `Bearer ${clerkToken}`)

            return fetch(url, {
              ...options,
              headers,
            })
          },
        },
      },
    )
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const {data: allEntries} = await client.from("entries").select();
        const {data: filteredDreams} = (await client.from("entries").select().eq('selection', 'Dream'));
        const {data: filteredJournal} = (await client.from("entries").select().eq('selection', 'Event'));

        setDreamsCount(filteredDreams?.length ?? 0);
        setJournalCount(filteredJournal?.length ?? 0);
        setUserPoints((allEntries?.length ?? 0) * 5);

      } catch (error) {
        console.error("Error fetching journal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden px-4 md:p-0">   
      <div className="flex flex-col text-center max-w-full items-center justify-center p-2 md:p-8 rounded-lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
          className={`${subTitle.className} grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 justify-center items-center`}
        >
          <Scoreboard
            totalPoints={getPoints}
            currentLevel={calculateLevels(getPoints)[0]}
            nextLevel={calculateLevels(getPoints)[0] + 1}
            progressPercentage={calculateLevels(getPoints)[1]}
            dreamCount={dreamsCount}
            eventCount={journalCount}
          />
          <div className="flex flex-col gap-2 text-left items-center mx-auto justify-center bg-white/10 backdrop-blur-xl md:p-8 p-4 rounded-xl md:text-lg text-md h-80">
            <div className="text-left">
              <li> Earn +5pts/entry for journaling your dreams or life events </li>
              <li> Earn +2pts/entry for entering your mood in calendar mood tracker </li>
              <li> Earn +10 bonus for achieving a 7-day streak! </li>
            </div>
            <p className="md:m-4 m-1"> Click on "Add" to begin your adventure!</p>
            <button onClick={() => router.push("/add")}>
              <EnterButton />
            </button>
          </div>
        </motion.div>
        <div className="relative z-10 flex flex-col items-center justify-center md:mt-8 mt-4 text-[#a8b0d3]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
            transition={{ duration: 0.4 }}
          >
            <p className={`${subTitle.className} md:py-6 py-3`}> Click on each card to learn more. </p>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
              {cardData.map((card, index) => (
                <CardFlip key={index} front={card.front} back={card.back} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
