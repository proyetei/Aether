// context/QuestionContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuestionContextType {
  selectedQuestion: string | null;
  setSelectedQuestion: (question: string) => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export const QuestionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return (
    <QuestionContext.Provider value={{ selectedQuestion, setSelectedQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestion = (): QuestionContextType => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error('useQuestion must be used within a QuestionProvider');
  }
  return context;
};
