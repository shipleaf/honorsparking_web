"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { ParkingZone } from "./ReservationList";
import PlaceHeader from "./PlaceHeader";
import NaverMapComponent from "./NaverMapComponent";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";

interface Props {
  data: ParkingZone;
}

type FeeRule = {
  ruleName: string;
  startTime: number;
  endTime: number | null;
  costPerTimeSlot: number;
  costTimeSlot: number;
};

export default function ReservationDetailComponents({ data }: Props) {
  const [isBookMark, setIsBookMark] = useState(false);
  const [isDetailPageOpen, setIsDetailPageOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

  const handleBookMark = () => {
    setIsBookMark((prev) => !prev);
  };

  useEffect(() => {
    if (isDetailPageOpen) {
      document.body.style.overflow = "hidden"; // ✅ 스크롤 막기
    } else {
      document.body.style.overflow = "auto"; // ✅ 다시 허용
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDetailPageOpen]);

  const formatFeeRules = (rules: FeeRule[]): string[] => {
    if (!rules || rules.length === 0) return ["요금 정보 없음"];

    const sorted = [...rules].sort((a, b) => a.startTime - b.startTime);
    const MAX_TIME = 2147483647;

    return sorted.map((rule, index) => {
      const durationMinutes = (rule.endTime ?? MAX_TIME) - rule.startTime + 1;

      const formattedTime =
        durationMinutes >= 60
          ? `${Math.floor(durationMinutes / 60)}시간${
              durationMinutes % 60 ? ` ${durationMinutes % 60}분` : ""
            }`
          : `${durationMinutes}분`;

      const cost = rule.costPerTimeSlot.toLocaleString(); // 2000 → "2,000"

      if (index === 0) {
        // 최초 요금
        return rule.costTimeSlot === durationMinutes
          ? `최초 ${formattedTime} ${cost}원`
          : `최초 ${formattedTime} ${rule.costTimeSlot}분당 ${cost}원`;
      } else if (rule.endTime === null || rule.endTime === MAX_TIME) {
        return `이후 ${rule.costTimeSlot}분당 ${cost}원`;
      } else {
        const rangeMinutes = rule.endTime - rule.startTime + 1;
        const rangeStr =
          rangeMinutes >= 60
            ? `${Math.floor(rangeMinutes / 60)}시간${
                rangeMinutes % 60 ? ` ${rangeMinutes % 60}분` : ""
              }`
            : `${rangeMinutes}분`;

        return `이후 ${rangeStr} ${rule.costTimeSlot}분당 ${cost}원`;
      }
    });
  };

  const ruleText = formatFeeRules(data.parkingFeeRules);

  return (
    <div
      className="flex flex-col w-full bg-[#fff] p-4 rounded-[16px] gap-4"
      onClick={() => setIsDetailPageOpen(true)}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-3 w-[90%]">
          <Image
            src={data?.thumbnail}
            alt=""
            width={48}
            height={48}
            className="w-[20%]"
          />
          <div className="flex flex-col items-start justify-center w-[80%]">
            <span className="font-[700] w-[90%] truncate overflow-hidden whitespace-nowrap">
              {data?.zoneName}
            </span>
            <span className="text-[#7E7F83] font-[500]">
              {data?.cityName} {data?.districtName} {data?.eupMyeonDongName}
            </span>
          </div>
        </div>
        <button
          className="w-[10%] flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            handleBookMark();
          }}
        >
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
      <div className="flex flex-row gap-1 items-center justify-start pl-2 py-2">
        <span className="text-[#2A2A2A] font-[700] text-lg">주차요금</span>
        <Image
          src="/src/icon/Information.svg"
          alt=""
          width={24}
          height={24}
          onClick={(e) => {
            setIsFeeModalOpen(true);
            e.stopPropagation();
          }}
        />
      </div>
      <Modal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        title="주차요금"
      >
        <div className="bg-surface-grey rounded-[10px] p-4 space-y-2">
          {ruleText.map((line: string, index: number) => (
            <p key={index} className="text-action font-bold text-body">
              {line}
            </p>
          ))}
        </div>
        <div className="w-full mt-6">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setIsFeeModalOpen(false)}
          >
            확인
          </Button>
        </div>
      </Modal>
      {isDetailPageOpen && (
        <div
          className="fixed bg-[#fff] inset-0 z-[10000]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PlaceHeader
            setIsDetailPageOpen={setIsDetailPageOpen}
            zoneName={data?.zoneName}
          />
          <NaverMapComponent data={data} />
        </div>
      )}
    </div>
  );
}
