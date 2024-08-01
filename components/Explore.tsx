"use client";

import React, { useState } from "react";
import { mainTitle } from "@/fonts/font";
import TabComponent from "./TabComponent";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import SearchFunction from "./SearchFunction";
import SubmitButton from "./buttons/SubmitButton";
import AddEntryModal from "./AddEntryModal";

export default function Explore() {

  return (
    <>
    <div className="min-h-screen mx-auto md:px-12 p-0 md:pt-6 pt-0 overflow-hidden">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="md:w-3/5 w-full">
          <SearchFunction />
          </div>
        </div>
          <TabComponent />
      </div>
    </div>
    </>

  );
}
