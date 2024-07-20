"use client"
import React, {useState} from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import { UserButton} from "@clerk/nextjs";
import { X } from "lucide-react";
import Image from "next/image";
import { subTitle } from "@/fonts/font";
import { useRouter, usePathname } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: {
        delay: 0.5,
      },
    },
    show: {
      y: 0,
      opacity: 1,
      duration: 0.3,
    },
  };
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
      <div className="flex items-center justify-between py-4 md:bg-gradient-to-b from-black to-transparent shadow-md">
        <div className="hover:underline px-4 flex flex-row gap-2 items-center justify-center">
          <UserButton afterSignOutUrl="/" />
        </div>
        {/* Hide the hamburger menu icon on medium size devices*/}
      <div className="md:hidden">
      <button className="px-4 py-4" onClick={() => setIsOpen(!isOpen)}>
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
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                variants={sidebarVariants}
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link href={`/${link.hash}`}>
                  <div
                    className=
                      {` ${subTitle.className} flex w-full items-center justify-center hover:text-indigo-400 transition cursor-pointer hover:scale-125 ${path === `/${link.hash}` ? 'font-bold underline' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </header>
  );
}