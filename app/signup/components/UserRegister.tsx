"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSignupStageStore } from "@/store/useSignupStore";
import { useSignupStore } from "@/store/useSignupStore";
import { checkDuplication, SignUp } from "@/apis/auth/auth.api";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/Input";

export default function UserRegister() {
  const [accountId, setAccountId] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { stage, prevStage } = useSignupStageStore();
  const { setSignupData } = useSignupStore();
  const router = useRouter();
  const [checkMessage, setCheckMessage] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);

  const reset = useSignupStageStore((state) => state.reset);

  const handleSignup = async () => {
    if (accountPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ✅ 상태 업데이트 (비밀번호 & 아이디 저장)
    setSignupData({ accountId, accountPassword });

    // ✅ `setSignupData`를 제외한 `signupData` 가져오기
    // eslint-disable-next-line
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

  const handleCheckDuplication = async () => {
    if (!accountId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const result = await checkDuplication(accountId);
      if (result === true) {
        setIsIdAvailable(true);
        setCheckMessage("이미 사용 중인 아이디입니다.");
      } else {
        setIsIdAvailable(false);
        setCheckMessage("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 확인 실패:", error);
      setIsIdAvailable(false);
      setCheckMessage("중복 확인 중 오류가 발생했습니다.");
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
            <button
              className="border border-[#093AEE] rounded-[6px] py-1 px-2 text-[#093AEE]"
              onClick={handleCheckDuplication}
            >
              중복확인
            </button>
          </div>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          {isIdAvailable !== null && (
            <p
              className={`text-sm mt-1 px-2 ${
                isIdAvailable ? "text-red-600" : "text-[#093AEE]"
              }`}
            >
              {checkMessage}
            </p>
          )}
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
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
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
          <Input
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
