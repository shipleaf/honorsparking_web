import React from "react";
import CarNumberInput from "../ticket/payment/car-change/components/CarNumberInput";
// import ChangeButton from "../ticket/payment/car-change/components/ChangeButton";
import Image from "next/image";

export default function page() {
  return (
    <div className="bg-[#F0F0F0]">
      <div className="relative w-full flex flex-col items-center justify-center gap-2 py-12">
        <Image src="/src/icon/LoginParking.svg" alt="" width={50} height={30} />
        <Image
          src="/src/image/LoginCar.png"
          alt=""
          width={280}
          height={30}
          className="z-50"
        />
        <div className="absolute bg-[#999] w-[80%] h-6 rounded-[50%] blur-[5px] opacity-50 bottom-[40px] z-10"></div>
      </div>
      <div className="bg-white rounded-t-[32px] w-full px-4 pt-8">
        <div className="flex items-center justify-center gap-[30%] mb-6">
          <div className="font-[700] text-md text-[#7E7F83]">로그인</div>
          <div className="font-[700] text-md">비회원</div>
        </div>
        <div className="font-[700] text-[#2a2a2a] text-[1.25rem] p-6">
          고객님의 차량번호를 입력해 주세요.
        </div>
        <div className="flex flex-col gap-6 px-6 mt-2">
          <CarNumberInput />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mt-10"></div>
      </div>
      <div className="fixed bg-[#093AEE] w-[90%] bottom-[5vh] left-1/2 -translate-x-1/2 rounded-[999px] p-4 text-white text-center">
        결제하기
      </div>
    </div>
  );
}
