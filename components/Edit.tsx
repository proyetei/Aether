"use client";

import React from "react";
import { Entry } from "@prisma/client";
import { motion } from "framer-motion";
import { subTitle } from "@/fonts/font";
import EditEntry from "./forms/EditEntry";
import { FC } from "react";

interface EditProps {
    post: Entry
  }
const Edit: FC<EditProps> = ({ post }) => {

  return (
    <div className="min-h-screen overflow-hidden">
        <div className="max-w-screen-lg mx-auto p-4 rounded-lg md:w-4/5 sm:w-11/12">
          <div className="items-center justify-center">
            <p className={`${subTitle.className} text-3xl md:text-5xl text-left font-bold mb-2 text-indigo-500`}> EDIT ENTRY </p>
          <EditEntry post = {post} />
          </div>
        </div>
      </div>
  );
}

export default Edit