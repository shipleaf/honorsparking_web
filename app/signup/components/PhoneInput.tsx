"use client"

import React, { useState } from "react";

export default function PhoneInput() {
  const [hasValue, setHasValue] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, "");

    if (value !== filteredValue) {
      alert("숫자만 입력해주세요.");
    }
    setHasValue(filteredValue.length > 0);
    e.target.value = filteredValue;
  };

  return (
    <div className="bg-white rounded-md p-4 flex flex-col justify-center">
      <label className="text-[#467EE7] text-[14px] font-400">Phone</label>
      <input
        type="tel"
        placeholder="전화번호를 입력해주세요"
        className={`p-2 focus:outline-none focus:border-b focus:border-b-[#467EE7] ${
          hasValue ? "border-b border-b-[#467EE7]" : ""
        }`}
        onInput={handleInput}
      />
    </div>
  );
}