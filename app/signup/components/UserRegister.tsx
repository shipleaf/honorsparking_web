"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSignupStageStore } from "@/store/useSignupStore";
import { useSignupStore } from "@/store/useSignupStore";
import { SignUp } from "@/app/api/useSocialLoginAPI";

export default function UserRegister() {
  const [accountId, setAccountId] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { stage, nextStage, prevStage } = useSignupStageStore();
  const { setSignupData, ...signupData } = useSignupStore();

  const handleSignup = async () => {
    if (accountPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ✅ 상태 업데이트 (비밀번호 & 아이디 저장)
    setSignupData({ accountId, accountPassword });

    // ✅ `setSignupData`를 제외한 `signupData` 가져오기
    const { setSignupData: _, ...filteredSignupData } =
      useSignupStore.getState();

    console.log("📢 회원가입 요청 데이터:", filteredSignupData);

    try {
      // ✅ API 호출
      await SignUp(filteredSignupData);
      alert("회원가입이 완료되었습니다!");
      nextStage();
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="px-6 space-y-4">
        <span className="text-[1.25rem] font-[700]">
          회원 등록을 시작할게요 <br /> 회원님의 기본정보를 알려주세요.
        </span>
        <div className="bg-white p-4 rounded-[16px] space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/icon/Information.svg"
                alt=""
                width={24}
                height={24}
              />
              <span className="text-md font-[700]">아이디</span>
            </div>
            <button className="border border-[#093AEE] rounded-[6px] py-1 px-2 text-[#093AEE]">
              중복확인
            </button>
          </div>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="bg-[#F0F0F0] p-4 w-full rounded-[12px] focus:outline-none"
          />
        </div>
        <div className="bg-white p-4 rounded-[16px] space-y-2">
          <div className="flex items-center gap-2">
            <Image src="/icon/Information.svg" alt="" width={24} height={24} />
            <span className="text-md font-[700]">비밀번호</span>
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
            className="w-full focus:outline-none flex p-4 bg-[#F0F0F0] rounded-[12px] overflow-hidden"
          />
        </div>
        <div className="bg-white p-4 rounded-[16px] space-y-2">
          <div className="flex items-center gap-2">
            <Image src="/icon/Information.svg" alt="" width={24} height={24} />
            <span className="text-md font-[700]">비밀번호 확인</span>
          </div>
          <input
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full focus:outline-none flex p-4 bg-[#F0F0F0] rounded-[12px] overflow-hidden"
          />
        </div>
      </div>

      <div className="fixed bottom-4 w-full px-6 z-100">
        {stage === 2 && (
          <div className="w-full flex justify-between">
            <button
              className="bg-[#D2D2D2] text-[17px] text-[#2a2a2a] font-[500] py-4 w-[33%] rounded-[999px]"
              onClick={prevStage}
            >
              이전
            </button>
            <button
              className="bg-[#10B981] text-[17px] text-[#fff] font-[500] py-4 w-[64%] rounded-[999px]"
              onClick={handleSignup}
            >
              가입하기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
