"use client";

import React from "react";
import { mainTitle } from "@/fonts/font";
import TabComponent from "./TabComponent";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import SearchFunction from "./SearchFunction";

export default function Explore({ placeholder } : {placeholder: string }) {

  return (
    <div className="min-h-screen mx-auto md:px-12 p-4 pt-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="w-full md:w-3/5">
          <SearchFunction placeholder = {placeholder} />
          </div>
        </div>
          <TabComponent />
      </div>
    </div>
  );
}
