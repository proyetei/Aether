"use client";

import React from "react";
import { subTitle } from "@/fonts/font";
import EditEntry from "./forms/EditEntry";
import { FC } from "react";
import { Database } from '@/database.types';
interface EditProps {
    post: Database['public']['Tables']['entries']['Row']
  }
const Edit: FC<EditProps> = ({ post }) => {

  return (
    <div className="min-h-screen mx-auto md:px-12 p-0 md:pt-6 pt-0 overflow-hidden">
      <p className={`${subTitle.className} text-3xl md:text-5xl text-left font-bold mb-2 text-indigo-500`}> EDIT ENTRY </p>
      <EditEntry post = {post} />
    </div>

  );
}

export default Edit