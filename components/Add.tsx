"use client";

import React, { useState } from "react";

import EntryForm from "./forms/EntryForm";
import { QuestionProvider } from "./QuestionContext";

export default function Add() {

  return (
    <>
    <div className="min-h-screen mx-auto md:px-12 p-0 md:pt-6 pt-0 overflow-hidden">
        <QuestionProvider>
            <EntryForm />
        </QuestionProvider>
    </div>
    </>

  );
}
