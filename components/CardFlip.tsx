import React, { useState } from 'react';
import ReactCardFlip from "react-card-flip";
import { cn } from '@/lib/utils';

interface CardProps {
  front: string;
  back: string;
}

const CardFlip: React.FC<CardProps> = ({ front, back }) => {
  const [flipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!flipped);
  };

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <div
        className={cn(
          'flex justify-center items-center p-4 w-60 h-60 bg-indigo-900/10 backdrop-blur-lg border border-indigo-600 drop-shadow-blue rounded-lg cursor-pointer transition-transform duration-800 ease-in-out',
          { 'transform rotate-y-180': flipped }
        )}
        onClick={handleClick}
      >
          <div className="text-2xl font-bold">
            {front}
          </div>
      </div>

      <div
        className={cn(
          'flex justify-center items-center p-4 w-60 h-60 bg-white/10 backdrop-blur-lg drop-shadow-blue rounded-lg cursor-pointer transition-transform duration-800 ease-in-out',
          { 'transform rotate-y-180': flipped }
        )}
        onClick={handleClick}
      >
          <div className="text-md font-bold">
            {back}
          </div>
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip;
