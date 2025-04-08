import React from "react";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col w-full bg-gray-100 p-4 rounded-[16px] gap-4 animate-pulse">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3">
          <div className="bg-gray-200 rounded-full w-12 h-12" />
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 h-4 w-24 rounded" />
            <div className="bg-gray-200 h-4 w-32 rounded" />
          </div>
        </div>
        <div className="bg-gray-200 rounded-full w-8 h-8" />
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-gray-200 rounded-[16px] p-4 h-24" />
        <div className="bg-gray-200 rounded-[16px] p-4 h-24" />
      </div>
    </div>
  );
}