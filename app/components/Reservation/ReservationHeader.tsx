"use client";

import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function ReservationHeader() {
  const router = useRouter();

  const navigateToReservation = () => {
    router.push("/reservation")
  }

  return (
    <div className="flex flex-row justify-between">
      <span className="font-[700] text-[22px]">주차장 찾기</span>
      <button className="flex flex-row gap-1 items-center justify-center" onClick={navigateToReservation}>
        <span className="text-[#404041]">자세히보기</span>
        <IoIosArrowForward className="text-[#404041]" />
      </button>
    </div>
  );
}