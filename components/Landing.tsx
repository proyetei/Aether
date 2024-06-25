"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { logo } from "@/fonts/font";
import { motion } from "framer-motion";
import LandingText from "./LandingText";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Content */}
      <div className="w-3/4 items-center bg-black/30 backdrop-blur-sm p-8 rounded-lg shadow-lg relative z-10">
        <motion.div
          viewport={{ once: true }}
          whileInView="show"
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
              x: -300,
            },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                type: "spring",
              },
            },
          }}
          className="flex w-full flex-col items-center gap-4 text-zinc-800 relative z-10"
        >
        <Image src="/aether-bot.svg" alt="Aether bot" height={90} width={90} />
            <p className={`${logo.className} text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500 z-10`}>
              Aether
            </p>
          <LandingText />
          <Button className=" hover:drop-shadow-glow bg-gradient-to-r from-blue-400 to-pink-400" size="lg" asChild>
            <Link href="/sign-in">Explore the app</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
