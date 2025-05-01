import React from "react";
import Image from "next/image";
import { ParkingHistory } from "./History";

interface Props {
  data: ParkingHistory;
}

function formatDateRange(start?: string, end?: string): string {
  const twoDigit = (n: number) => n.toString().padStart(2, "0");

  const format = (date: Date) => {
    const year = date.getFullYear();
    const month = twoDigit(date.getMonth() + 1);
    const day = twoDigit(date.getDate());
    const hour = twoDigit(date.getHours());
    const minute = twoDigit(date.getMinutes());
    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
  };

  const startText = start ? format(new Date(start)) : "";
  const endText = end ? format(new Date(end)).split(" ")[3] : "";

  if (start && end) {
    return `${startText} ~ ${endText}`;
  } else if (start) {
    return `${startText} ~`;
  } else if (end) {
    return `~ ${endText}`;
  } else {
    return "시간 정보 없음";
  }
}

export default function HistoryComponents({ data }: Props) {
  return (
    <div className="rounded-[20px] bg-white py-5 space-y-4">
      <div className="flex pl-5">
        <div className="font-[700] text-lg flex-1">{data?.zoneName}</div>
        <div className="font-[600] bg-[#35CAF4] text-white rounded-bl-[10px] w-[65px] h-[30px] text-center p-1 text-[13px]">
          정기권
        </div>
      </div>
      <div className="body flex flex-col gap-4 px-5">
        <div className="flex flex-row gap-2">
          <div className="rounded-full bg-[#F6F6F6] w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/src/icon/Calendar.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col ">
            <span className="text-[#7E7F83] text-md">이용 날짜</span>
            <span className="text-[#2A2A2A] font-[500]">
              {formatDateRange(data.entranceTime, data.exitTime)}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="rounded-full bg-[#F6F6F6] w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/src/icon/OnTicket.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col ">
            <span className="text-[#7E7F83] text-md">이용권 사용</span>
            <span className="text-[#2A2A2A] font-[500]">
              회원가입 기념 50% 할인권
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="rounded-full bg-[#F6F6F6] w-[45px] h-[45px] flex items-center justify-center">
            <Image src="/src/icon/Card.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#7E7F83] text-md">결제 금액</span>
            <span className="text-[#2A2A2A] font-[500]">
              {data?.amount > 0
                ? `${data.amount.toLocaleString()}원`
                : "정기권 결제"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
