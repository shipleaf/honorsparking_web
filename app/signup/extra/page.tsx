"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMyInfo } from "@/app/api/MyPageAPI";
import { updateUserRole } from "@/app/api/UserActivity";
import { logout } from "@/app/api/useSocialLoginAPI";

export default function SocialSignupPage() {
  const router = useRouter();
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [locationAgree, setLocationAgree] = useState<boolean>(false);
  const [carNumber, setCarNumber] = useState("");
  const carNumberRegex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
  const [carNumberError, setCarNumberError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const allChecked = serviceAgree && privacyAgree && locationAgree;

  const allAgreed = serviceAgree && privacyAgree;
  const isCarNumberValid = carNumber.trim() !== "";
  const isSubmitEnabled = allAgreed && isCarNumberValid;

  const handleAllAgree = () => {
    const nextValue = !(serviceAgree && privacyAgree && locationAgree);
    setServiceAgree(nextValue);
    setPrivacyAgree(nextValue);
    setLocationAgree(nextValue);
  };

  const handleSubmit = async () => {
    if (!carNumberRegex.test(carNumber)) {
      setCarNumberError("올바른 차량번호 형식이 아닙니다. (예: 12가3456)");
      return;
    }

    try {
      setIsLoading(true); // 로딩 시작

      await updateMyInfo(carNumber);
      await updateUserRole();

      router.push("/");
      // eslint-disable-next-line
    } catch (error: any) {
      console.error("차량번호 등록 실패:", error);

      if (
        error?.response?.status === 500 &&
        error?.response?.data?.message?.includes("아직 등록")
      ) {
        setCarNumberError("이미 등록된 차량입니다.");
      } else {
        setCarNumberError("차량번호 등록 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center pt-12 px-6">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl w-full text-start font-extrabold text-[#2a2a2a]">
            간편 회원가입
          </h2>
          <p className="text-sm text-[#666]">
            회원가입을 위해 동의 항목과 차량번호를 입력해 주세요.
          </p>
        </div>

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

        <div>
          <label className="block mb-2 text-sm font-medium text-[#2a2a2a]">
            차량번호
          </label>
          <input
            type="text"
            placeholder="예: 12가3456"
            value={carNumber}
            onChange={(e) => {
              setCarNumber(e.target.value);
              setCarNumberError(""); // 입력 중 에러 초기화
            }}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
          {carNumberError && (
            <p className="text-sm text-red-500 mt-1">{carNumberError}</p>
          )}
        </div>
        <div className="space-y-4">
          <button
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
            className={`w-full py-3 rounded-full text-white text-sm font-medium transition
            ${
              isSubmitEnabled
                ? "bg-[#093AEE]"
                : "bg-[#D2D2D2] cursor-not-allowed"
            }`}
          >
            가입하기
          </button>
          <button
            onClick={async () => {
              await logout();
            }}
            className="w-full py-3 rounded-full text-white text-sm font-medium transition bg-[#093AEE]/50"
          >
            가입취소
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
          <span className="loader !w-[48px] !bg-[#2221d0]"></span>
        </div>
      )}
    </div>
  );
}
