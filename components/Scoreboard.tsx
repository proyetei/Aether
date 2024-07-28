import React from 'react';

interface PointsUIProps {
  totalPoints: number;
  currentLevel: number;
  nextLevel: number;
  progressPercentage: number;
}

const PointsUI: React.FC<PointsUIProps> = ({ totalPoints, currentLevel, nextLevel, progressPercentage }) => {
  return (
    <div className="bg-indigo-400/70 backdrop-blur-xl rounded-2xl md:p-6 p-4 w-64 shadow-md border-b-4 border-r-4 border-indigo-300">
      <div className="md:text-xl text-md font-bold text-slate-900">TOTAL POINTS</div>
      <div className="md:text-4xl text-2xl font-bold text-slate-900">{totalPoints}</div>
      <div className=" text-left md:text-md text-sm">Current level</div>
      <div className="relative">
        <div className="flex justify-between text-sm font-medium">
          <span>{currentLevel}</span>
          <span>{nextLevel}</span>
        </div>
        <div className="h-4 rounded-full bg-gray-300 mt-1 relative overflow-hidden">
          <div className="h-full rounded-full bg-indigo-700 absolute left-0 top-0" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default PointsUI;
