"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMyStatus } from "@/app/api/UserActivity";
import { ParkingStatusResponse } from "@/app/components/UserStatus";

// const data = {
//   parkingZone: {
//     entranceTime: "2025-05-22T00:00:00",
//     cost: 2200,
//     zoneName: "Seoul Gangnam-gu Yeoksam-dong Parking Lot",
//     hourlyRate: 1000,
//   },
// };

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

export default function MyPagePaymentComponent() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<ParkingStatusResponse | null>(
    null
  );

  // useEffect(() => {
  //   setPaymentData(data);
  // }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchMyStatus();
        setPaymentData(data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    loadUserData();
  }, []);

  if (!paymentData) return null;

  if (
    ("message" in paymentData &&
      paymentData.message === "해당 사용자의 주차 기록이 없습니다.") ||
    ("isParked" in paymentData && paymentData.isParked === false)
  ) {
    return (
      <div className="rounded-[1.25rem] bg-white w-full flex items-center justify-center p-6">
        <span className="text-[#999] text-[14px]">현재 주차중이 아닙니다</span>
      </div>
    );
  }

  if ("parkingZone" in paymentData && paymentData.parkingZone !== null) {
    return (
      <div className="rounded-[1.25rem] bg-white w-full flex flex-col p-4 gap-2">
        <span className="font-[500] text-[#2A2A2A] text-[14px]">
          {paymentData.parkingZone?.zoneName}
        </span>
        <div className="flex flex-col">
          <span className="text-[#2A2A2A] font-[700] text-[1.25rem]">
            입차시간:{" "}
            {paymentData.parkingZone?.entranceTime
              ? formatElapsedTime(paymentData.parkingZone?.entranceTime)
              : "-"}
          </span>
          <span className="text-md font-[400] text-[#7E7F83]">
            비용: {paymentData.parkingZone.cost?.toLocaleString() ?? 0}원 /
            시간당{" "}
          </span>
        </div>
        <button
          className="bg-[#093AEE] text-white text-md font-[500] p-3 rounded-[999px] mt-3"
          onClick={() => router.push("/payment")}
        >
          {paymentData.parkingZone?.cost?.toLocaleString() ?? 0}원 결제하기
        </button>
      </div>
    );
  }
}
