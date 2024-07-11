"use client";

import { motion } from "framer-motion";
import { logo, mainTitle, subTitle } from "@/fonts/font";
import { useEffect, useState } from "react";
import EnterButton from "./buttons/EnterButton";
import axios from "axios";
import { User } from "@prisma/client";


interface UserProps{
  userInfo: User
}
const Homepage: React.FC<UserProps> = ({userInfo}) => {
  return (
    <div className="min-h-screen">   
      <div className="relative text-center max-w-full items-center justify-center p-8 rounded-lg shadow-lg">
      <div className="text-end">
            <p className={`${subTitle.className} text-lg`}>Your current points: {userInfo?.userPoints !== null ? userInfo?.userPoints : '0'}</p>
            </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
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
            <h1 className={`${mainTitle.className} md:text-7xl text-5xl font-bold p-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}>
              Welcome back!
            </h1>
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
            <EnterButton />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Homepage
