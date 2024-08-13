import React from 'react';

interface PointsUIProps {
  totalPoints: number;
  currentLevel: number;
  nextLevel: number;
  progressPercentage: number;
  dreamCount: number;
  eventCount: number;
}

const PointsUI: React.FC<PointsUIProps> = ({ totalPoints, currentLevel, nextLevel, progressPercentage, dreamCount, eventCount }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl grid grid-cols-[2fr_1fr] rounded-xl md:py-4 md:px-12 py-2 px-4 w-full md:h-80 h-56 shadow-md border-b-4 border-r-4 border-indigo-300 items-center justify-center">
      <div className='flex flex-col'>
      <div className='flex flex-col items-center justify-center border-cyan-400 border-2 rounded-full md:py-8 py-4 mx-8'>
      <p className="md:text-lg text-sm font-bold">TOTAL <br/> POINTS</p>
      <p className="md:text-6xl text-4xl font-bold">{totalPoints} <span className='text-2xl'> / 250 </span></p>
      </div>
      <p className=" text-left md:text-md text-sm md:mt-6 mt-2">Current level</p>
        <div className="flex justify-between md:text-xl text-md">
          <span>{currentLevel}</span>
          <span>{nextLevel}</span>
        </div>
        <div className="h-3 rounded-full bg-gray-300 relative overflow-hidden">
          <div className="h-full rounded-full bg-indigo-700 absolute left-0 top-0" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <div className='grid grid-row md:gap-8 gap-2 items-end justify-center'>
        <div className='bg-violet-500/30 backdrop-blur-xl rounded-xl py-2 px-4'> <div className='flex flex-col'> <p> Dreams: </p> <p> {dreamCount}</p></div> </div>
        <div className='bg-violet-500/30 backdrop-blur-xl rounded-xl py-2 px-4'> <div className='flex flex-col'> <p> Events: </p> <p> {eventCount}</p></div> </div>
      </div>
    </div>
  );
};

export default PointsUI;
