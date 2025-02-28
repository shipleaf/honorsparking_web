import React from "react";
import PhoneInput from "./PhoneInput";
import BottomButton from "./BottomButton";

export default function PhoneAuth() {
  return (
    <>
      <div className="px-6 space-y-4">
        <span className="text-[1.25rem] font-[700]">
          전화번호 인증이 필요해요
        </span>
        <PhoneInput />
      </div>
      <BottomButton />
    </>
  );
}
