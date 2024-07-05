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


export default function AboutContent() {
  const router = useRouter()
  return (
      <div className="text-center p-4">
        <Separator className="my-12 opacity-30"/>
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
          className="max-w-screen-lg mx-auto p-8 rounded-sm shadow-lg bg-black/30 backdrop-blur-s"
        >

          <div className="flex flex-col space-y-8 md:grid md:grid-cols-1 sm:grid-cols-1">
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
          <div className="grid grid-cols-1 gap-4 items-center py-3">
            <AboutText />
          </div>
        </motion.div>
      </div>
  );
}