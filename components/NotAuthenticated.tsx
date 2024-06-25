"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { bodyText, mainTitle} from "@/fonts/font"

export default function NotAuthenticated() {
    return(
    <div className="min-h-screen">
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
          className="flex flex-col items-center justify-center text-center gap-4 text-zinc-800 relative z-10"
        >
          <div className="my-6">
            <p
              className={` ${mainTitle.className} md:text-6xl text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-400 to-purple-700 z-10 `}
            >
              Not Authenticated!
            </p>
            <div className="flex items-center justify-center p-4">
              <Image src="/hampter.png" alt="hampter meme" height={200} width ={200} />
            </div>
          </div>

          {/* Subheader */}
          <div
            className={` ${bodyText.className} bg-slate-800 text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500`}
          >
            Please log in! &gt;:(
          </div>

          </motion.div>

    </div>
    )
}