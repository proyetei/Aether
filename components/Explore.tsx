"use client";

import React from "react";
import { mainTitle } from "@/fonts/font";
import TabComponent from "./TabComponent";

const Explore: React.FC = () => {

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto p-4">
          <div className="grid grid-cols-1 items-center ">
              <h1 className={` ${mainTitle.className}  text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-400 to-purple-700`}> Explore Journal </h1>
              <TabComponent />
          </div>
    </div>
  );
}


export default Explore;