"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function ReservationComponents() {
  const [isBookMark, setIsBookMark] = useState(false);

  const handleBookMark = () => {
    setIsBookMark((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full bg-[#fff] p-4 rounded-[16px] gap-4">
      {/* 예약 컴포넌트 헤더 */}
      <div className="flex flex-row justify-between">
        {/* 주소지 */}
        <div className="flex flex-row gap-3">
          <Image src="/src/image/Sample.png" alt="" width={48} height={48} />
          <div className="flex flex-col items-start justify-center">
            <span className="font-[700]">A타워</span>
            <span className="text-[#7E7F83] font-[500]">
              경기도 용인시 처인구
            </span>
          </div>
        </div>
        {/* 즐겨찾기 버튼 */}
        <button onClick={handleBookMark}>
          {isBookMark ? (
            <Image
              src="/src/icon/OnBookMark.svg"
              alt=""
              width={30}
              height={30}
            />
          ) : (
            <Image src="/src/icon/BookMark.svg" alt="" width={30} height={30} />
          )}
        </button>
      </div>
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-[#F7F7F7] rounded-[16px] p-3 flex flex-col gap-5">
          <div className="flex flex-row items-center justify-start">
            <Image src="/src/icon/Parking.svg" alt="" width={30} height={30} />
            <span className="text-[#4C4D4F] font-[500]">주차공간</span>
          </div>
          <span className="text-xl font-[700] pl-3 pb-2">100개</span>
        </div>
        <div className="bg-[#F7F7F7] rounded-[16px] p-3 flex flex-col gap-5">
          <div className="flex flex-row items-center justify-start">
            <Image src="/src/icon/ElectCar.svg" alt="" width={30} height={30} />
            <span className="text-[#4C4D4F] font-[500]">전기차</span>
          </div>
          <span className="text-xl font-[700] pl-3 pb-2">30개</span>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-start pl-2">
        <span className="text-[#2A2A2A] font-[700] text-lg">1,500원</span>
        <span className="text-[#7E7F83] font-[500] text-[15px]">시간당</span>
      </div>
    </div>
  );
}
