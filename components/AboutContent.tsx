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


export default function AboutContent() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-4">
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
          className="max-w-screen-lg mx-auto p-8 rounded-sm shadow-lg bg-slate-900"
        >

          <div className="flex flex-col items-center justify-center space-y-8 md:grid md:grid-cols-1 sm:grid-cols-1">
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
          <SignedOut>
          <div className="border-t border-gray-300 w-full my-4"></div>
          <Button className="bg-gradient-to-r from-blue-400 to-pink-400 hover:drop-shadow-glow" onClick={() => router.push("/")}> Go Home </Button>
          </SignedOut>
        </motion.div>
      </div>
    </div>
  );
}