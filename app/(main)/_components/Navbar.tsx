"use client"
import React, {useEffect, useState} from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import { UserButton} from "@clerk/nextjs";
import { X } from "lucide-react";
import Image from "next/image";
import { subTitle } from "@/fonts/font";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Nickname from "@/components/forms/Nickname";
import { Button } from "@/components/ui/button";

const API_URL = 'http://localhost:8080/api/nickname'; // URL points to Spring Boot backend
export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(true);
  };
  const [savedNickname, setSavedNickname] = useState<string|null>(null) // saved nickname type should be of string
  const fetchNickname = async () => {
    try {
        const response = await axios.get(API_URL);
        const lastIndex = (Math.max(response.data.length)) - 1
        if (response.data.length > 0) {
            setSavedNickname(response.data[lastIndex].name); //fetches the most recent name
        }
      } catch (error) {
        console.error("Error fetching nickname:", error);
    }
  };
  useEffect(() => {
    fetchNickname();
  }, []);

  const modalVariants = {
    hidden: {
        y: '-100vh',
    },
    visible: {
        y: 0,
        transition: {
            type: 'tween', 
            duration: 0.3,
        },
    },
};

  return (
    <header className="relative z-50">
      <div className="flex items-center justify-between py-4 md:bg-transparent">
        <div className="md:px-8 px-4 flex flex-row gap-2 items-center justify-center">
        <UserButton afterSignOutUrl="/" />
      <p className="hover:underline">Hi, {savedNickname}</p>
      {showInput ? (
        <Nickname />
      ) : (
        <Button variant="link" onClick={handleButtonClick} className="text-slate-40 md:text-lg text-sm">[Update nickname]</Button>
      )}
        </div>
        {/* Hide the hamburger menu icon on medium size devices*/}
      <div className="md:hidden">
      <button className="px-3 py-2" onClick={() => setIsOpen(!isOpen)}>
           <Image src="/hamburgermenu.svg" alt="Hamburger menu" height={35} width={35} />
        </button>
      </div>
        <motion.div
          className={
         `${
            isOpen ? 'flex' : 'hidden md:flex'
          } fixed md:static top-0 right-0 h-full md:h-auto w-full md:w-auto bg-zinc-900 md:bg-transparent transition-transform duration-300 transform md:transform-none ${
            isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          } flex-col md:flex-row items-center justify-center z-10 md:z-auto`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
        >
          <X
            className="md:hidden hover:scale-110 absolute top-8 right-8"
            size={25}
            onClick={() => setIsOpen(!isOpen)}
          />
          <ul className="flex flex-col md:flex-row md:text-[1rem] text-[1.3rem] font-medium gap-8 md:gap-12 p-5 md:px-8 md:py-0 animate-fade-up">
            {links.map((link) => (
                <Link href={`/${link.hash}`}>
                  <div
                    className=
                      {` ${subTitle.className} flex w-full items-center justify-center hover:text-indigo-400 transition cursor-pointer hover:scale-125 ${path === `/${link.hash}` ? 'font-bold underline' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
            ))}
          </ul>
        </motion.div>
      </div>
    </header>
  );
}