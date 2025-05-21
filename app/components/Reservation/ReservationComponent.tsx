"use client";

import React from "react";
import Image from "next/image";
import { ParkingZone } from "@/app/reservation/components/ReservationList";

interface Props {
  data: ParkingZone;
}

export default function ReservationComponents({ data }: Props) {
  return (
    <div className="flex flex-col w-full bg-[#fff] p-4 rounded-[16px] gap-4">
      {/* 예약 컴포넌트 헤더 */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Image src={data?.thumbnail} alt="" width={48} height={48} />
          <div className="flex flex-col items-start justify-center">
            <span className="font-[700] text-sm">A타워</span>
            <span className="text-[#7E7F83] text-sm font-[500]">
              {data?.cityName} {data?.districtName} {data?.eupMyeonDongName}
            </span>
          </div>
        </div>
        {/* 즐겨찾기 버튼 */}
        <button>
          {data?.isFavorite ? (
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
          <span className="text-xl font-[700] pl-3 pb-2">{data?.size}개</span>
        </div>
        <div className="bg-[#F7F7F7] rounded-[16px] p-3 flex flex-col gap-5">
          <div className="flex flex-row items-center justify-start">
            <Image src="/src/icon/ElectCar.svg" alt="" width={30} height={30} />
            <span className="text-[#4C4D4F] font-[500]">전기차</span>
          </div>
          <span className="text-xl font-[700] pl-3 pb-2">
            {data?.electricCarSpaceCount}개
          </span>
        </div>
      </div>
    </div>
  );
}
