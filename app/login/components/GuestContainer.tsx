"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { NonMemberParkingEntry } from "@/apis/guest/GuestAPI";

interface GuestProps {
  GuestProps: {
    entries: NonMemberParkingEntry[];
  };
  showModal: () => void;
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
};

export default function GuestContainer({ GuestProps, showModal }: GuestProps) {
  const router = useRouter();
  const [isCheckedList, setIsCheckedList] = useState(
    new Array(GuestProps.entries.length).fill(false)
  );
  const [detailOpenList, setDetailOpenList] = useState(
    new Array(GuestProps.entries.length).fill(false)
  );

  const handleCheckbox = (index: number) => {
    const updated = [...isCheckedList];
    updated[index] = !updated[index];
    setIsCheckedList(updated);
  };

  const handleToggleDetail = (index: number) => {
    const updated = [...detailOpenList];
    updated[index] = !updated[index];
    setDetailOpenList(updated);
  };

  const handleSettlement = () => {
    if (!isCheckedList.some((v) => v)) {
      alert("정산할 내용을 체크해 주세요.");
      return;
    }
    router.push("/payment/tosspayment");
  };

  return (
    <div className="bg-[#f0f0f0] h-[100vh] overflow-y-auto pb-[100px] overflow-auto">
      <div className="header grid grid-cols-5 p-6 font-[700] text-md">
        <button className="text-start" onClick={showModal}>
          <span>이전</span>
        </button>
        <span className="col-span-3 text-center">HONORS KOREA</span>
        <div></div>
      </div>
      <div className="bg-[#172A4B] py-2 text-center text-white font-semibold">
        비회원 정산
      </div>
      {GuestProps.entries.map((entry, idx) => (
        <div key={idx} className="px-4 text-[#2a2a2a]">
          <div className="title gap-1 flex items-center mb-2">
            <span className="font-[700] text-[1.25rem]">
              {entry.vehicleNumber}
            </span>
            <span className="font-[500] text-[1rem]">님 환영합니다!</span>
          </div>

          <div className="bg-[#F4F7FC] flex items-center gap-4 min-h-[110px] w-full">
            <div className="flex bg-inherit h-full items-center justify-center w-[20%]">
              <input
                type="checkbox"
                checked={isCheckedList[idx]}
                onChange={() => handleCheckbox(idx)}
              />
            </div>
            <div className="flex flex-col text-[#999] font-[500] text-sm">
              <span>차량번호: {entry.vehicleNumber}</span>
              <span>주차장: {entry.parkingLotLocation}</span>
              <span>주차시간: {formatDateTime(entry.entryTime)}</span>
            </div>
          </div>

          <button
            className="w-full flex items-center justify-center bg-[#d9d9d9] z-10 gap-2 py-2"
            onClick={() => handleToggleDetail(idx)}
          >
            <span className="text-white font-[500]">자세히보기</span>
            <IoIosArrowDown
              color="white"
              className={`transform transition-transform ${
                detailOpenList[idx] ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            className={`transition-all duration-300 z-0 ease-in-out ${
              detailOpenList[idx]
                ? "translate-y-0 opacity-100"
                : "max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            <div className="bg-white p-4 border-t">
              <p className="text-[#666] font-[700]">입차 사진</p>
              <Image src={entry.entryPhotoUrl} alt="" width={240} height={24} />
            </div>
            <div className="bg-white p-4 border-t flex flex-col">
              <p className="text-[#666] font-[700]">주차 요금</p>
              <span>주차 시간: {entry.totalParkingMinutes}분</span>
              <span>금액: {entry.currentFee?.toLocaleString() ?? "0"}원</span>
            </div>
          </div>
        </div>
      ))}

      <div className="fixed bottom-4 w-full px-4 flex justify-between">
        <button
          className="bg-[#f0f0f0] text-[#2a2a2a] font-[500] w-[33%] py-4 rounded-[999px]"
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
        <button
          className={`font-[700] px-12 py-4 rounded-[999px] w-[64%] ${
            isCheckedList.some((v) => v)
              ? "bg-[#093aee] text-white"
              : "bg-[#d9d9d9] text-white"
          }`}
          onClick={handleSettlement}
        >
          정산하기
        </button>
      </div>
    </div>
  );
}