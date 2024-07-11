"use client";

import React from "react";
import { mainTitle } from "@/fonts/font";
import TabComponent from "./TabComponent";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const Explore: React.FC = () => {

  return (
    <div className="min-h-screen mx-auto md:px-12 p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className={` ${mainTitle.className}  text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-400 to-purple-700`}> Explore Journal </h1>
          <Link href="/add"> <Button className=" hover:scale-110 gap-2 bg-gradient-to-r from-pink-400 to-blue-400" size="sm"> <FaPlus /> Add new </Button></Link>
        </div>
        <TabComponent />
      </div>
    </div>
  );
}


export default Explore;