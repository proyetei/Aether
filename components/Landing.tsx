"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logo, poppins, subTitle } from "@/fonts/font";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Landing() {
  return (
      <div className=" flex flex-row gap-2 w-3/4 items-center rounded-lg relative z-10 text-center">
        <motion.div
          viewport={{ once: true }}
          whileInView="show"
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 2,
                type: "spring",
              },
            },
          }}
          className="flex w-full flex-col items-center gap-4 relative z-10"
        >
          <div className="flex flex-row gap-4 items-center justify-center drop-shadow-intense-blue animate-flip-up animate-duration-[1000ms] animate-delay-500 animate-ease-in-out">
            {/* <Image src="/aether-bot.svg" alt="Aether bot" height={70} width={70} /> */}
            <p className={`${logo.className} md:text-7xl text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500 z-10`}>
              Aether
            </p>
          </div>
          <p className={`${subTitle.className} text-xl md:text-2xl py-4 text-indigo-300 drop-shadow-intense-blue`}>
            HELPING YOU GAMIFY YOUR PERSONAL GROWTH AND MENTAL HEALTH JOURNEY
          </p>
          <p className={`${poppins.className} text-sm md:text-lg text-slate-100 drop-shadow-blue pb-4`}>
          Journal your life events, dreams, and mindfulness practices all in one place.
          Powered by AI, view reports into your own psyche and visualize your journals with image generation. 
          <br/>
          Track your moods daily with our easy-to-use calendar mood tracker and get mood chart reports.
          </p>
          <Button className="shadow-lg shadow-fuchsia-500/50 hover:scale-90 -skew-y-3 border-b-4 border-blue-500 bg-gradient-to-r from-blue-600 to-pink-500 hover:opacity-85" size="lg" asChild>
            <Link href="/sign-in"><span className={`${subTitle.className} text-xl`}> SIGN UP </span></Link>
          </Button>
        </motion.div>
        <motion.div className="drop-shadow-white"
        viewport={{ once: true }}
          whileInView="show"
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 1.5,
                type: "spring",
              },
            },
          }}>
          {/* <div className="md:w-[300px] md:h-[300px] w-[150px] h-[100px]">
            <Image src="/journal-anime-girl.png" alt="girl" layout="responsive" width={600} height={500} className="object-cover"/>
          </div> */}
        </motion.div>
      </div>
  )
}
