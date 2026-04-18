"use client";

import { useSignupStageStore, useSignupStore } from "@/store/useSignupStore";
import React, { useEffect, useState } from "react";
import Input from "@/app/components/ui/Input";

export default function PhoneInput() {
  const [, setHasValue] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false); // ✅ 유효한 전화번호 여부
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false); // ✅ 인증 대기 상태
  const [displayPhone, setDisplayPhone] = useState(""); // 화면에 표시할 전화번호
  const [authValue, setAuthValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3분(180초) 타이머
  const authNumber = "123123";

  const { setSignupData } = useSignupStore();
  const nextStage = useSignupStageStore((state) => state.nextStage);

  // ✅ 전화번호 검증 함수 (010-1234-5678 형식)
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^01[016789]\d{7,8}$/; // 하이픈 없는 01012345678 형태 검사
    return phoneRegex.test(phone);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 숫자가 아닌 값이 포함된 경우 알림 표시
    if (/[^0-9]/.test(value)) {
      alert("숫자만 입력해주세요.");
      value = value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    }

    setHasValue(value.length > 0);

    // 하이픈 없는 원본 값 저장 (Zustand 스토어에 저장)
    setSignupData({ mobile: value });

    // 화면에 표시할 값 (하이픈 추가)
    if (value.length >= 11) {
      value = value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }

    setDisplayPhone(value); // 화면에서는 하이픈 포함하여 보여줌
  };

  useEffect(() => {
    if (isWaitingForAuth) {
      setTimeLeft(180); // 카운트다운 초기화 (3분)
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isWaitingForAuth]);

  useEffect(() => {
    const unsubscribe = useSignupStore.subscribe((state) => {
      console.log("Mobile changed (스토어):", state.mobile);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handlePhoneAuth = () => {
    if (!isValidPhone) {
      alert("올바른 전화번호를 입력해주세요.");
      return;
    }

    // ✅ 인증 요청 후 상태 변경
    setIsWaitingForAuth(true);
    console.log(
      "인증 요청을 보냅니다. (전화번호: ",
      useSignupStore.getState().mobile, // Zustand에서 가져오는 값 (하이픈 없음)
      ")"
    );
  };

  // 여기서 백엔드에서 받은 Auth 번호를 authNumber로 설정

  const handleVerifyAuth = () => {
    if (authValue === authNumber) {
      console.log("✅ 인증 성공 이벤트 발생!");
      nextStage();
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <div className="space-y-6 flex flex-col w-full items-center">
      <div className="bg-white w-full rounded-md p-4 flex flex-col justify-center">
        <label className="text-[#467EE7] text-[14px] font-400">Phone</label>
        <Input
          variant="underline"
          type="tel"
          placeholder="전화번호를 입력해주세요"
          value={displayPhone}
          error={displayPhone.length > 0 && !isValidPhone ? " " : undefined}
          onChange={handleInput}
          onInput={() =>
            setIsValidPhone(validatePhoneNumber(displayPhone.replace(/-/g, "")))
          }
        />
        {isWaitingForAuth ? (
          <div className="w-full flex flex-col mt-4">
            <label className="text-[#467EE7] text-[14px] font-400">
              인증 번호
            </label>
            <div className="flex items-center w-full justify-between gap-2">
              <Input
                variant="underline"
                type="text"
                placeholder="인증 번호를 입력해주세요"
                value={authValue}
                onChange={(e) => setAuthValue(e.target.value)}
              />
              <span className="text-sm text-[#FF0000] shrink-0">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      {isWaitingForAuth ? (
        <div className="w-full flex items-center justify-between">
          <button
            className={`w-[64%] rounded-[16px] p-4 text-white font-[500] ${
              isValidPhone ? "bg-[#F59E0B]" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handlePhoneAuth}
            disabled={!isValidPhone}
          >
            인증 번호 다시 받기
          </button>
          <button
            className={`w-[33%] rounded-[16px] p-4 text-white font-[500] ${
              isValidPhone ? "bg-[#093AEE]" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValidPhone}
            onClick={handleVerifyAuth}
          >
            인증하기
          </button>
        </div>
      ) : (
        <button
          className={`w-[64%] rounded-[16px] p-4 text-white font-[500] ${
            isValidPhone ? "bg-[#F59E0B]" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handlePhoneAuth}
          disabled={!isValidPhone}
        >
          인증 번호 받기
        </button>
      )}
    </div>
  );
}
