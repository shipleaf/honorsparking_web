"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ParkingZoneInfo } from "../UserStatus";

interface InParkingProps {
  data: ParkingZoneInfo;
}

const formatElapsedTime = (entranceTimeISO: string) => {
  const entrance = new Date(entranceTimeISO);

  // 현재 시간 (한국 시간 기준)
  const now = new Date();
  const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC + 9

  const diffMs = nowKST.getTime() - entrance.getTime(); // 밀리초 차이
  if (diffMs < 0) return "0시 0분";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hours)}시간 ${pad(minutes)}분`;
};

export default function Accounting({ data }: InParkingProps) {
  const router = useRouter();

  const navigatePayment = () => {
    router.push("/payment");
  };

  return (
    <div className="relative w-full rounded-[20px] p-4">
      <div className="absolute inset-0 rounded-[20px] bg-white opacity-40 backdrop-blur-[6px] pointer-events-none"></div>
      <div className="relative space-y-2">
        <div className="flex flex-row justify-between items-center gap-2">
          <span className="font-[700] text-black">
            {data.zoneName ?? "주차장 정보 없음"}
          </span>
          <span className="text-[14px] text-[#7E7F83]">시간당 {data.hourlyRate.toLocaleString()}원</span>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-[10px] flex flex-col gap-1 p-4">
              <span className="text-[#093AEE] font-[500] text-[14px]">
                입차 시간
              </span>
              <span className="font-[700] text-lg">
                {data?.entranceTime ? formatElapsedTime(data.entranceTime) : "-"}
              </span>
            </div>
            <div className="bg-white rounded-[10px] flex flex-col gap-1 p-4">
              <span className="text-[#093AEE] font-[500] text-[14px]">
                비용
              </span>
              <span className="font-[700] text-lg">
                {data.cost.toLocaleString()}원
              </span>
            </div>
          </div>
          <button
            className="w-full bg-[#093AEE] rounded-[999px] font-[400] text-white p-3"
            onClick={navigatePayment}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
