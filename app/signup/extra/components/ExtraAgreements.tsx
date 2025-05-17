"use client";

import React, { useState } from "react";
import { useSignupStageStore } from "@/store/useSignupStore";

export default function ExtraAgreements() {

  // 체크박스 체크 여부
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);
  const [locationAgree, setLocationAgree] = useState<boolean>(false);

  const allChecked = serviceAgree && privacyAgree && locationAgree;

  // 전체동의 체크박스 핸들러
  const handleAllAgree = () => {
    const nextValue = !(serviceAgree && privacyAgree && locationAgree);
    setServiceAgree(nextValue);
    setPrivacyAgree(nextValue);
    setLocationAgree(nextValue);
  };

  // 필수 항목만 체크되었는지 여부 (버튼 활성화 조건)
  const allAgreed = serviceAgree && privacyAgree;

  const { nextStage } = useSignupStageStore();

  return (
    <>
      <div className="px-6 space-y-6">
        <div className="bg-[#fff] rounded-[16px] p-4 space-y-6 pt-6">
          <span className="font-[700] text-[1.25rem] text-[#2a2a2a]">
            필수 약관에 동의해주세요
          </span>
          <div className="space-y-4">
            <div className="flex border border-[#467EE7] rounded-[0.75rem] p-4 items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded-[12ox] w-4 h-4 border-[#ACAFB3]"
                  checked={allChecked}
                  onChange={handleAllAgree}
                />
                <span>약관 전체동의</span>
              </label>
            </div>
            <hr />
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
              <div className="flex border border-[#467EE7] rounded-[0.75rem] p-4 items-center gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded-[12ox] w-4 h-4 border-[#ACAFB3]"
                    id="privacy"
                    checked={locationAgree}
                    onChange={() => setLocationAgree(!locationAgree)}
                  />
                  <span>(선택) 위치정보처리방침 동의</span>
                </label>
                <button className="text-[#ACAFB3] text-[12px] font-[400]">
                  보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 w-full px-6 z-100">
        <div className="w-full flex justify-center">
          <button
            className={`text-[17px]  font-[500] py-4 w-[80%] rounded-[999px]
              ${
                allAgreed
                  ? "bg-[#093AEE] text-[#fff]"
                  : "text-[#fff] bg-[#D2D2D2]"
              }`}
            onClick={nextStage}
            disabled={!allAgreed}
          >
            다음으로
          </button>
        </div>
      </div>
    </>
  );
}
