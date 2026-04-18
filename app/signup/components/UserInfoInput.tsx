"use client";

import Image from "next/image";
import React, { useState } from "react";
import DateCalendar from "./DateCalendar";
import { useSignupStore } from "@/store/useSignupStore";
import { MdCancel } from "react-icons/md";
import Input from "@/app/components/ui/Input";

export default function UserInfoInput() {
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const { setSignupData } = useSignupStore();
  const [birthDate, setBirthDate] = useState("");

  // 입력값이 변경될 때 상태 및 store 업데이트
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value);
    setSignupData({ name: e.target.value });
  };

  const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(e.target.value);
    setSignupData({ carNumber: e.target.value });
  };

  return (
    <div className="px-6 space-y-4">
      <span className="text-[1.25rem] font-[700]">
        회원 등록을 시작할게요 <br /> 회원님의 기본정보를 알려주세요.
      </span>
      <div className="bg-white p-4 rounded-[16px] space-y-2">
        <div className="flex items-center gap-2">
          <Image
            src="/src/icon/Information.svg"
            alt=""
            width={24}
            height={24}
          />
          <span className="text-md font-[700]">이름</span>
        </div>
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          value={accountName}
          onChange={handleNameChange}
        />
      </div>
      <div className="bg-white p-4 rounded-[16px] space-y-2">
        <div className="flex items-center gap-2">
          <Image src="/src/icon/Calendar.svg" alt="" width={24} height={24} />
          <span className="text-md font-[700]">생년월일</span>
        </div>
        <button
          className="flex p-4 bg-[#F0F0F0] rounded-[12px] overflow-hidden w-full"
          onClick={() => setIsBottomSheet(true)}
        >
          <input
            readOnly
            type="date"
            placeholder="생년월일을 입력해주세요"
            className="w-full bg-inherit focus:outline-none"
            value={birthDate}
            onMouseDown={(e) => e.preventDefault()}
          />
          <Image src="/src/icon/Arrow.svg" alt="" width={24} height={24} />
        </button>
      </div>
      <div className="bg-white p-4 rounded-[16px] space-y-2">
        <div className="flex items-center gap-2">
          <Image src="/src/icon/OnHome.svg" alt="" width={24} height={24} />
          <span className="text-md font-[700]">차량번호</span>
        </div>
        <Input
          type="text"
          placeholder="차량번호를 입력해주세요"
          value={carNumber}
          onChange={handleCarNumberChange}
          className="font-medium"
        />
      </div>
      <div
        className={`fixed inset-0 z-[999] bg-opacity-50 transition-opacity duration-300 ${
          isBottomSheet ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsBottomSheet(false)}
      >
        <div
          className={`fixed left-0 bg-[#fff] w-full h-[60vh] z-[1000] rounded-t-[16px] bottom-0 transform transition-transform duration-300 ${
            isBottomSheet ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end w-full p-4 z-1000">
            <MdCancel
              className="font-[700] text-xl"
              onClick={() => setIsBottomSheet(false)}
              size={24}
              color="#cccccc"
            />
          </div>
          <DateCalendar
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            isBottomSheet={isBottomSheet}
            setIsBottomSheet={setIsBottomSheet}
          />
        </div>
      </div>
    </div>
  );
}
