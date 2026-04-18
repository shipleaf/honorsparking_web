"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function Accounting() {
  const router = useRouter();

  const navigatePayment = () => {
    router.push("/payment");
  };

  return (
    <div className="relative w-full rounded-[20px] p-4">
      <div className="absolute inset-0 rounded-[20px] bg-white opacity-40 backdrop-blur-[6px] pointer-events-none"></div>
      <div className="relative space-y-2">
        <div className="flex flex-row justify-between items-center gap-2">
          <span className="font-[700] text-black">A타워</span>
          <span className="text-[14px] text-[#7E7F83]">시간당 1,000원</span>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-[10px] flex flex-col gap-1 p-4">
              <span className="text-[#093AEE] font-[500] text-[14px]">
                입차 시간
              </span>
              <span className="font-[700] text-lg">5시 20분</span>
            </div>
            <div className="bg-white rounded-[10px] flex flex-col gap-1 p-4">
              <span className="text-[#093AEE] font-[500] text-[14px]">
                비용
              </span>
              <span className="font-[700] text-lg">2,000원</span>
            </div>
          </div>
          <Button fullWidth size="md" onClick={navigatePayment}>
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
