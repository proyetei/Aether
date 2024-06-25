"use client";

import React from "react";
import { Entry } from "@prisma/client";
import { motion } from "framer-motion";
import { logo, mainTitle, subTitle } from "@/fonts/font";
import EditEntry from "./forms/EditEntry";
import { FC } from "react";

interface EditProps {
    post: Entry
  }
const Edit: FC<EditProps> = ({ post }) => {

  return (
    <div className="min-h-screen">
        {/* Animations */}
        <motion.div
          viewport={{ once: true }}
          whileInView="show"
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
              y: -50,
            },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.50,
                type: "spring",
              },
            },
          }}
          className="max-w-screen-lg mx-auto p-4 rounded-lg md:w-4/5 sm:w-11/12"
        >
          <div className="items-center justify-center">
            <p className={`${mainTitle.className} text-3xl md:text-5xl text-left font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500`}> Edit Entry </p>
          <EditEntry post = {post} />
          </div>
        </motion.div>
      </div>
  );
}

export default Edit