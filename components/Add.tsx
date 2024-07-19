"use client";

import React from "react";
import { motion } from "framer-motion";
import { logo, mainTitle, subTitle } from "@/fonts/font";
import EntryForm from "./forms/EntryForm";
import { useEffect, useState } from "react";
export default function Add() {

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
          <EntryForm />
          </div>
        </motion.div>
      </div>
  );
}
