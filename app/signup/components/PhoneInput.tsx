"use client";

import { CheckPhoneAuth, SendPhoneAuth } from "@/apis/auth/auth.api";
import CautionModal from "@/app/components/modal/CautionModal";
import { useSignupStageStore, useSignupStore } from "@/store/useSignupStore";
import React, { useEffect, useState } from "react";
import Input from "@/app/components/ui/Input";

export default function PhoneInput() {
  const [, setHasValue] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isWaitingForAuth, setIsWaitingForAuth] = useState(false);
  const [authValue, setAuthValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [cautionModal, setCautionModal] = useState(false);

  const { setSignupData } = useSignupStore();
  const nextStage = useSignupStageStore((state) => state.nextStage);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^01[016789]\d{7,8}$/;
    return phoneRegex.test(phone);
  };

  const [rawPhone, setRawPhone] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만
    setRawPhone(value);
    setHasValue(value.length > 0);
    setSignupData({ mobile: value });
    setIsValidPhone(validatePhoneNumber(value));
  };

  useEffect(() => {
    if (isWaitingForAuth) {
      setTimeLeft(180);
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

  const handlePhoneAuth = async () => {
    if (!isValidPhone) {
      alert("올바른 전화번호를 입력해주세요.");
      return;
    }

    try {
      await SendPhoneAuth(rawPhone);
      setIsWaitingForAuth(true);
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.response?.status === 409) {
        setCautionModal(true);
      } else {
        setCautionModal(true);
      }
    }
  };

  // const handlePhoneAuth = async () => {
  //   nextStage()
  // }

  const handleVerifyAuth = async () => {
    try {
      await CheckPhoneAuth(rawPhone, authValue);
      nextStage(); // 다음 단계로 이동
    } catch {
      alert("인증번호가 올바르지 않거나 만료되었습니다.");
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
      {cautionModal && (
        <CautionModal
          title="이미 가입된 전화번호입니다."
          body=""
          onClose={() => {
            setCautionModal(false);
            setRawPhone("");
            setIsValidPhone(false);
          }}
        />
      )}
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
