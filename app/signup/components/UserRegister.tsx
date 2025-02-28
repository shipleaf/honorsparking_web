"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSignupStageStore } from "@/store/useSignupStore";
import { useSignupStore } from "@/store/useSignupStore";
import { SignUp } from "@/app/api/useSocialLoginAPI";
import { useRouter } from "next/navigation";

export default function UserRegister() {
  const [accountId, setAccountId] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { stage, nextStage, prevStage } = useSignupStageStore();
  const { setSignupData, ...signupData } = useSignupStore();
  const router = useRouter();

  const reset = useSignupStageStore((state) => state.reset);

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

    try {
      // ✅ API 호출
      await SignUp(filteredSignupData);
      router.push("/login");
      reset();
    } catch {
      return;
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
                src="/src/icon/Information.svg"
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
            <Image
              src="/src/icon/Information.svg"
              alt=""
              width={24}
              height={24}
            />
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
            <Image
              src="/src/icon/Information.svg"
              alt=""
              width={24}
              height={24}
            />
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
        {stage === 3 && (
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
