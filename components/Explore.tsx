"use client";

import React from "react";
import { mainTitle } from "@/fonts/font";
import TabComponent from "./TabComponent";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import SearchFunction from "./SearchFunction";

const Explore: React.FC = () => {

  return (
    <div className="min-h-screen mx-auto md:px-12 p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="w-full md:w-3/5">
          <SearchFunction />
          </div>
          <div className="md:visible">
          <Link href="/add"> <Button className=" hover:scale-110 gap-2 bg-gradient-to-r from-pink-400 to-blue-400" size="sm"> <FaPlus /> Add new </Button></Link>
          </div>
        </div>
          <TabComponent />
      </div>
    </div>
  );
}


export default Explore;