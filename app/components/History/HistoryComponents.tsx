import React from "react";
import Image from "next/image";
import { ParkingHistory } from "./History";

interface Props {
  data: ParkingHistory;
}

export default function HistoryComponents({data}: Props) {
  return (
    <div className="rounded-[20px] bg-white p-5 space-y-4">
      <span className="font-[700] text-lg">{data?.zoneName}</span>
      <div className="body flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div className="rounded-full bg-[#F6F6F6] w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/src/icon/Calendar.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col ">
            <span className="text-[#7E7F83] text-md">이용 날짜</span>
            <span className="text-[#2A2A2A] font-[500]">{data.entranceTime} ~ {data.exitTime}</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="rounded-full bg-[#F6F6F6] w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/src/icon/OnTicket.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col ">
            <span className="text-[#7E7F83] text-md">이용권 사용</span>
            <span className="text-[#2A2A2A] font-[500]">회원가입 기념 50% 할인권</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="rounded-full bg-[#F6F6F6] w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/src/icon/Card.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#7E7F83] text-md">결제 금액</span>
            <span className="text-[#2A2A2A] font-[500]">5,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
