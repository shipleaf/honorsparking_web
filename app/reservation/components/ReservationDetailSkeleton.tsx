import React from "react";

export default function ReservationDetailSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full bg-gray-100 p-4 rounded-[16px] gap-4">
      {/* Header */}
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-3 w-[90%]">
          <div className="bg-gray-200 rounded-full w-12 h-12" />
          <div className="flex flex-col justify-center w-full gap-2">
            <div className="bg-gray-200 h-4 w-[60%] rounded" />
            <div className="bg-gray-200 h-4 w-[80%] rounded" />
          </div>
        </div>
        <div className="bg-gray-200 rounded-full w-8 h-8" />
      </div>

      {/* Info Grid */}
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-gray-200 rounded-[16px] p-4 h-24" />
        <div className="bg-gray-200 rounded-[16px] p-4 h-24" />
      </div>

      {/* 요금 섹션 */}
      <div className="flex flex-row gap-2 items-center pl-2 py-2">
        <div className="bg-gray-200 w-20 h-6 rounded" />
        <div className="bg-gray-200 w-6 h-6 rounded-full" />
      </div>
    </div>
  );
}