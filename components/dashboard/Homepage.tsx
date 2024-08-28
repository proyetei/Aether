"use client";
import React from "react";
import { motion } from "framer-motion";
import { subTitle } from "@/fonts/font";
import { useEffect, useState } from "react";
import EnterButton from "../buttons/EnterButton";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { calculateLevels } from "@/lib/calculateLevels";
import Scoreboard from "./Scoreboard";
import CardFlip from "./CardFlip";
import { cardData } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Entry } from "@prisma/client";

const Homepage: React.FC = () => {
  const [getPoints, setUserPoints] = useState<number | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const filteredDreamsCount = (entries.filter((entry) => entry.selection === "Dream")).length
  const filteredExperienceCount = (entries.filter((entry) => entry.selection === "Event")).length

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get('/api/points', {});
        const entries = await axios.get("/api", {});
        setUserPoints(response.data);
        setEntries(entries.data);
      } catch (error) {
        console.error('Error fetching user points:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPoints();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen"> <ClipLoader color="white" /> </div> )
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
      {(getPoints !== null) ? (<Scoreboard
        totalPoints={getPoints}
        currentLevel={calculateLevels(getPoints)[0]}
        nextLevel={calculateLevels(getPoints)[0] + 1}
        progressPercentage={calculateLevels(getPoints)[1]}
        dreamCount={filteredDreamsCount}
        eventCount={filteredExperienceCount}
      />) : (<Scoreboard
        totalPoints={0}
        currentLevel={1}
        nextLevel={2}
        progressPercentage={0}
        dreamCount={0}
        eventCount={0}
      />)}
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
          {/* Title */}
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
                <CardFlip key={index} front={card.front} back={card.back} />))}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default Homepage
