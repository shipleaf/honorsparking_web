"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSignupStore } from "@/store/useSignupStore";
import BottomButton from "./BottomButton";

export default function Agreements() {
  const { setSignupData } = useSignupStore();

  // 체크박스 체크 여부
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);

  const allAgreed = serviceAgree && privacyAgree;

  return (
    <>
      <div className="px-6 space-y-6">
        <div className="bg-[#fff] rounded-[16px] p-4 space-y-6">
          <span className="font-[700] text-[1.25rem] text-[#2a2a2a]">
            필수 약관에 동의해주세요
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex border border-[#467EE7] rounded-[0.75rem] p-4 items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded-[12ox] w-4 h-4 border-[#ACAFB3]"
                  checked={serviceAgree}
                  onChange={() => setServiceAgree(!serviceAgree)}
                />
                <span>(필수) 서비스 이용약관 동의</span>
              </label>
              <button className="text-[#ACAFB3] text-[12px] font-[400]">
                보기
              </button>
            </div>
            <div className="flex border border-[#467EE7] rounded-[0.75rem] p-4 items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded-[12ox] w-4 h-4 border-[#ACAFB3]"
                  id="privacy"
                  checked={privacyAgree}
                  onChange={() => setPrivacyAgree(!privacyAgree)}
                />
                <span>(필수) 개인정보처리방침 동의</span>
              </label>
              <button className="text-[#ACAFB3] text-[12px] font-[400]">
                보기
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] rounded-[16px] p-4 space-y-4">
          <div className="flex gap-2">
            <Image
              src="/src/icon/Information.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-md font-[700] text-[#2a2a2a]">
              이메일 (선택)
            </span>
          </div>
          <input
            type="email"
            className="w-full bg-[#F0F0F0] p-4 rounded-[12px] focus:outline-none placeholder:font-[500]"
            placeholder="입력한 이메일로 알림을 받을 수 있어요"
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSignupData({ email: e.target.value });
            }}
          />
        </div>
      </div>
      {allAgreed && <BottomButton />}
    </>
  );
}
