// hooks/useRandomQuestion.ts
import { useState } from "react";
import { questionBank } from "@/lib/data"; // Make sure the path is correct

const useRandomQuestion = () => {
  const [question, setQuestion] = useState<string>("");

  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    setQuestion(questionBank[randomIndex]);
  };

  return { question, generateRandomQuestion };
};

export default useRandomQuestion;
