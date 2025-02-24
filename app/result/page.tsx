"use client";

import React from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();

  // const navigatePayment = () => {
  //   router.push("/payment");
  // };
  return (
    <div className="bg-[#f0f0f0] h-[100vh]">
      <div className="grid grid-cols-5 items-center p-6 w-full">
        <span className="font-[700] text-center col-span-5">정산하기</span>
      </div>
      <div>
        <div className="relative py-4 w-full flex flex-col items-start justify-center overflow-hidden">
          <Image
            src="/src/image/inpark.png"
            alt=""
            width={350}
            height={100}
            className="flex items-center justify-center w-full"
          />
          <div className="absolute w-full rounded-[50%] bg-black h-8 bottom-8 left-[-10px] opacity-55 blur-[16px]"></div>
        </div>
        <div className="px-6 w-full mt-[-70px]">
          <div className="relative w-full rounded-[20px] p-4">
            <div className="absolute inset-0 rounded-[20px] bg-white opacity-40 backdrop-blur-[6px] pointer-events-none"></div>
            <div className="relative space-y-2">
              <div className="flex flex-row justify-between items-center gap-2">
                <span className="font-[700] text-black">A타워</span>
                <span className="text-[14px] text-[#7E7F83]">
                  시간당 1,000원
                </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 flex w-full justify-center items-center gap-4">
        <div className="text-center rounded-[10px] bg-[#fff] p-4 w-[30%] font-[700] text-md text-[#2a2a2a]">
          취소하기
        </div>
        <div className="text-center rounded-[10px] bg-[#093AEE] w-[60%] p-4 font-[700] text-md text-white">
          결제하기
        </div>
      </div>
    </div>
  );
}
