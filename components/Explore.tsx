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
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpenChange = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  return (
    <>
    <div className="min-h-screen mx-auto md:px-12 p-0 md:pt-6 pt-0">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="w-3/5 md:scale-100 scale-85">
          <SearchFunction />
          </div>
          <button onClick={() => handleModalOpenChange(true)} className="md:scale-100 scale-85">
            <SubmitButton placeholder="Add new" />
          </button>
        </div>
          <TabComponent />
      </div>
    </div>
    <AddEntryModal isOpen={isModalOpen} onOpenChange={handleModalOpenChange} />
    </>

  );
}
