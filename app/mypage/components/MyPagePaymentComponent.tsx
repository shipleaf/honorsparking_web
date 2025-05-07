"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMyStatus } from "@/app/api/UserActivity";
import { ParkingStatusResponse } from "@/app/components/UserStatus";

export default function MyPagePaymentComponent() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<ParkingStatusResponse | null>(
    null
  );

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

  if (!paymentData) {
    return (
      <div className="rounded-[1.25rem] bg-white w-full flex items-center justify-center p-6">
        <span className="text-[#999] text-[14px]">현재 주차중이 아닙니다</span>
      </div>
    );
  }

  if (!paymentData.isParked) {
    return (
      <div className="rounded-[1.25rem] bg-white w-full flex items-center justify-center p-6">
        <span className="text-[#999] text-sm">현재 주차중이 아닙니다</span>
      </div>
    );
  }

  return (
    <div className="rounded-[1.25rem] bg-white w-full flex flex-col p-4 gap-2">
      <span className="font-[500] text-[#2A2A2A] text-[14px]">
        {paymentData.parkingZone?.zoneName}
      </span>
      <div className="flex flex-col">
        <span className="text-[#2A2A2A] font-[700] text-[1.25rem]">
          입차시간: {paymentData.entranceTime ?? 0}분
        </span>
        <span className="text-md font-[400] text-[#7E7F83]">
          비용: {paymentData.cost?.toLocaleString() ?? 0}원 / 시간당{" "}
        </span>
      </div>
      <button
        className="bg-[#093AEE] text-white text-md font-[500] p-3 rounded-[999px] mt-3"
        onClick={() => router.push("/payment")}
      >
        {paymentData.cost?.toLocaleString() ?? 0}원 결제하기
      </button>
    </div>
  );
}
