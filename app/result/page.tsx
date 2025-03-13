"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isDetailOpened, setIsDetailOpened] = useState(false);

  const handleSettlement = () => {
    if (!isChecked) {
      alert("정산할 내용을 체크해 주세요.");
      return;
    } else {
      router.push("/payment/tosspayment");
    }
  };

  return (
    <div className="bg-[#f0f0f0] h-[100vh]">
      <div className="header grid grid-cols-5 p-6 font-[700] text-md">
        <span>이전</span>
        <span className="col-span-3 text-center">HONORS KOREA</span>
        <div></div>
      </div>
      <div className="bg-[#172A4B] py-2 text-center text-white font-semibold">
        비회원 정산
      </div>
      <div className="title px-4 text-[#2a2a2a] gap-1 flex items-center">
        <span className="font-[700] text-[1.25rem]">33나3333</span>
        <span className="font-[500] text-[1rem]">님 환영합니다!</span>
      </div>
      <div className="text-[1rem] w-full text-[#2a2a2a] p-4">
        <div className="p-2 font-[700]">주차중인 차량 정보</div>
        <hr className="my-4" />
        <div>
          <div className="bg-[#F4F7FC] flex items-center gap-4 h-[110px] w-full">
            <div className="flex bg-[#E9EDF6] h-full items-center justify-center w-[20%]">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </div>
            <div className="flex flex-col text-[#999] font-[500] text-sm">
              <span>차량번호: 33나3333</span>
              <span>주차장: 경기 용인 수지 신봉 A타워 101동</span>
              <span>주차시간: 2025년 03월 12일 12시 30분</span>
            </div>
          </div>
          <button
            className="w-full flex items-center justify-center bg-[#d9d9d9] z-10 gap-2 py-2"
            onClick={() => setIsDetailOpened(!isDetailOpened)}
          >
            <span className="text-white font-[500]">자세히보기</span>
            <IoIosArrowDown
              color="white"
              className={`transform transition-transform ${
                isDetailOpened ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div
            className={`transition-all duration-300 z-0 ease-in-out ${
              isDetailOpened
                ? "translate-y-0 opacity-100"
                : "max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            <div className="bg-white p-4 border-t">
              <p className="text-[#666] font-[700]">입차 사진</p>
              <Image
                src="/src/image/inpark.png"
                alt=""
                width={240}
                height={24}
              />
            </div>
            <div className="bg-white p-4 border-t flex flex-col">
              <p className="text-[#666] font-[700]">주차 요금</p>
              <span>주차 시간: 126분</span>
              <span>금액: 12,5000원</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 w-full px-4 flex justify-between">
        <button
          className="bg-[#f0f0f0] text-[#2a2a2a] font-[500] w-[33%] py-4 rounded-[999px]"
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
        <button
          className={`font-[700] px-12 py-4 rounded-[999px] w-[64%] ${
            isChecked ? "bg-[#093aee] text-white" : "bg-[#d9d9d9] text-white"
          }`}
          onClick={handleSettlement}
        >
          정산하기
        </button>
      </div>
    </div>
  );
}
