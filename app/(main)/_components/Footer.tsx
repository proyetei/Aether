"use client";

import { FC } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { poppins } from "@/fonts/font";
interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const router = useRouter();

  return (
        <div className="flex flex-col items-center justify-end gap-2 py-4
          2xl:rounded-xl h-64">
        <div className="social-links mx-auto flex gap-2 text-center text-bg sm:gap-4">
          <FaLinkedin
            onClick={() => {
              router.push("https://www.linkedin.com/in/proyeteiakanda/");
            }}
            className="cursor-pointer text-2xl transition duration-200 hover:rotate-12 hover:scale-105 active:scale-90 "
          />
          <Link href="https://www.linkedin.com/in/proyeteiakanda/"></Link>
          <FaGithub
            onClick={() => {
              router.push("https://github.com/proyetei");
            }}
            className="cursor-pointer text-2xl transition duration-200 hover:rotate-12 hover:scale-105 active:scale-90 "
          />
          <Link href="https://github.com/proyetei"></Link>
        </div>
        <p className={`${poppins.className} text-center text-xs`}>
          Copyright @{new Date().getFullYear()} Proyetei Reivue
        </p>
    </div>
  );
};

export default Footer;