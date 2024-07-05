"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React from "react";
import { motion } from "framer-motion";
import { projectData } from "@/lib/data";
import AboutText from "./AboutText";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { mainTitle } from "@/fonts/font";


export default function AboutContent() {
  const router = useRouter()
  return (
      <div className="w-3/4 items-center rounded-lg relative text-center">
        <Separator className="my-12 opacity-30"/>
        <div className="animate-fade animate-duration-[2000ms] animate-ease-out my-6">
          <h1 className={` ${mainTitle.className} text-left md:text-6xl text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-purple-600`}> About </h1>
        </div>
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
          className="w-full mx-auto p-2 rounded-sm shadow-lg"
        >

          <div className="flex flex-col space-y-8 md:grid grid-cols-1">
                  <Carousel>
                    <CarouselContent>
                      {Array.from({ length: projectData.length }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-video items-center justify-center p-2" style={{ backgroundImage: `url(${projectData[index]?.imgSrc})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
            </div>
        </motion.div>
        <div className="items-center rounded-lg bg-black/80 backdrop-blur-s">
            <AboutText />
          </div>
      </div>
  );
}