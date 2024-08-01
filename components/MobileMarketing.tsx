"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { poppins, subTitle } from "@/fonts/font";
import { motion } from "framer-motion";
import { IoLogoAppleAppstore } from "react-icons/io5";

export default function MobileMarketing(){
    return(
        <motion.div
            viewport={{ once: true }}
            whileInView="show"
            initial="hidden"
            variants={{
                hidden: {
                    opacity: 0,
                    x: -100,
                },
                show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 1,
                        type: "tween",
                    },
                },
          }}
        >
        <div className=" flex flex-col md:flex-row p-4 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
            <p className={`${subTitle.className} text-2xl font-extrabold text-indigo-300`}> Get the mobile app now!</p>
            <p className={`text-slate-300 ${poppins.className} text-md`}> Bored while traveling? Need an outlet for your thoughts? Have Aether by your side whenever and wherever</p>
            <p className={`text-slate-300 ${poppins.className} text-md`}>Set notifications to remind you to complete your tasks</p>
            <div className="flex flex-row gap-8">
                <button className="px-2 py-2 text-md text-white transition duration-300 ease-in-out delay-100 skew-y-3 bg-slate-800 border-b-4 border-slate-950 rounded shadow-lg shadow-purple-600/50 hover:skew-x-6 hover:border-slate-900">
                    <div className="flex flex-row gap-2 items-center justify-center">
                    <IoLogoAppleAppstore />
                    <a target="_blank" href="https://www.apple.com/ca/" rel="noopener noreferrer"> App Store </a>
                    </div>     
                </button>
                <button className="px-2 py-2 text-md text-white transition duration-300 ease-in-out delay-100 skew-y-3 bg-purple-600 border-b-4 border-purple-800 rounded shadow-lg shadow-purple-600/50 hover:skew-x-6 hover:border-purple-600">
                    <div className="flex flex-row gap-2 items-center justify-center">
                    <FaGooglePlay />
                    <a target="_blank" href="https://play.google.com/store/apps?hl=en" rel="noopener noreferrer"> Google Play </a>
                    </div>
                </button>
            </div>
            </div>
            <div className="flex items-center justify-center">
            <Image src="/mobile-marketing.png" alt="mobile" height={250} width={250} className="skew-y-6 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" />
            </div>
        </div>
    </motion.div>
    )
}


