"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function TicketPaymentInfo() {
    const router = useRouter();
    const handleChangeCar = () => {
        router.push("/ticket/payment/car-change")
    }
  return (
    <div className="bg-white rounded-[1.25rem] p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Image src="/src/icon/OnTicket.svg" alt="" width={24} height={24} />
        <span className="font-[700] text-[#2a2a2a] text-[17px]">
          정기권 구매 정보
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-[500] text-[17px] text-[#2a2a2a]">
          한양대학교 주차장
        </span>
        <span className="text-[13px] font-[500] text-[#7E7F83]">
          상품 유효기간 : 24년 12월 31일 ~ 25년 12월 31일
        </span>
      </div>
      <div className="bg-[#F0F0F0] rounded-[0.75rem] p-4 space-y-1">
        <span className="text-[14px] font-[500] text-[#2a2a2a]">주차권 사용 차량</span>
        <div className="flex justify-between items-center">
          <span className="font-[700] text-[1.25rem] text-[#2a2a2a]">33나 3333</span>
          <Button variant="text" size="sm" className="rounded-[6px] bg-white px-4 py-2" onClick={handleChangeCar}>변경하기</Button>
        </div>
      </div>
    </div>
  );
}
