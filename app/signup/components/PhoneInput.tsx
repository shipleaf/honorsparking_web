"use client";

import { useSignupStore } from "@/store/useSignupStore";
import React, { useEffect, useState } from "react";

export default function PhoneInput() {
  const [hasValue, setHasValue] = useState(false);
  const { setSignupData } = useSignupStore();

  // 현재 mobile의 경우 입력 마다 값이 업데이트 되도록 하는데 전화 번호 인증 완료시 한번 값을 업데이트 하도록 할 예정

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, "");

    if (value !== filteredValue) {
      alert("숫자만 입력해주세요.");
    }
    setSignupData({ mobile: e.target.value });
    setHasValue(filteredValue.length > 0);
    e.target.value = filteredValue;
  };

  useEffect(() => {
    const unsubscribe = useSignupStore.subscribe((state) => {
      console.log("Mobile changed:", state.mobile);
      console.log("Email changed:", state.email);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-white rounded-md p-4 flex flex-col justify-center">
      <label className="text-[#467EE7] text-[14px] font-400">Phone</label>
      <input
        type="tel"
        placeholder="전화번호를 입력해주세요"
        className={`p-2 focus:outline-none border-b border-b-[#fff] focus:border-b focus:border-b-[#467EE7] ${
          hasValue ? "border-b border-b-[#467EE7]" : ""
        }`}
        onInput={handleInput}
      />
    </div>
  );
}
