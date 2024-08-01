"use client";
import React from "react";
import { motion } from "framer-motion";
import { logo, mainTitle, subTitle } from "@/fonts/font";
import { useEffect, useState } from "react";
import EnterButton from "./buttons/EnterButton";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { calculateLevels } from "@/lib/calculateLevels";
import Scoreboard from "./Scoreboard";
import AddEntryModal from "./AddEntryModal";
import CardFlip from "./CardFlip";
import { cardData } from "@/lib/data";
import { Separator } from "./ui/separator";
const Homepage: React.FC = () => {
  const [getPoints, setUserPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpenChange = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get('/api/points', {});
        setUserPoints(response.data);
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
      <div className="flex items-center justify-center"> <ClipLoader color="white" /> </div> )
  }
  return (
    <div className="min-h-screen overflow-hidden">   
      <div className="relative text-center max-w-full items-center justify-center p-2 md:p-8 rounded-lg">
      <div className={`${subTitle.className} flex justify-center items-center`}>
      <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
            transition={{ duration: 0.4 }}
          >
      {(getPoints !== null) ? (<Scoreboard
        totalPoints={getPoints}
        currentLevel={calculateLevels(getPoints)[0]}
        nextLevel={calculateLevels(getPoints)[0] + 1}
        progressPercentage={calculateLevels(getPoints)[1]} 
      />) : (<Scoreboard
        totalPoints={0}
        currentLevel={1}
        nextLevel={2}
        progressPercentage={0}
      />)}
      </motion.div>
    </div>
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
            <h1 className={`${subTitle.className} md:text-5xl text-4xl font-bold md:mb-8 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-500`}>
              WELCOME BACK!
            </h1>
            <p className={`${subTitle.className} md:text-base text-md`}> Click on "add" to begin your journaling adventure! Collect +3 points per entry and +5 points in total for writing a response journal to a question.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button onClick={() => handleModalOpenChange(true)}>
              <EnterButton />
            </button>
            <Separator className="bg-slate-500 mt-4" />
            <p className={`${subTitle.className} md:py-6 py-3`}> Click on each card to learn more. </p>
            <div className=" grid md:grid-cols-5 grid-cols-1 gap-4">
              {cardData.map((card, index) => (
                <CardFlip key={index} front={card.front} back={card.back} />))}
            </div>
          </motion.div>
        </div>
        <AddEntryModal isOpen={isModalOpen} onOpenChange={handleModalOpenChange} />

      </div>
    </div>
  );
}

export default Homepage
