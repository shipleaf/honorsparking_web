"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import SocialLogin from "./SocialLogin";
import Image from "next/image";
import { getCsrf } from "@/app/api/useSocialLoginAPI";
import { useCsrfStore, useSignupStageStore } from "@/store/useSignupStore";
// import apiClient from "@/app/api/axiosWithCsrf";
import axios from "axios";
// import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export default function LoginFormContainer() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [carNumber, setCarNumber] = useState(""); // 상태 추가

  const [isSelected, setIsSelected] = useState("user");

  const carNumberRegex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
  const [error, setError] = useState("");
  const reset = useSignupStageStore((state) => state.reset);

  const handleSubmit = () => {
    if (carNumberRegex.test(carNumber)) {
      setError(""); // 에러 초기화
      router.push("/result");

      // 여기서 비회원 여부 API 요청, try, catch로 에러 발생시 alert로 이미 등록된 차량입니다를 띄우기
    } else {
      setError("올바른 차량 번호를 입력하세요. (예: 123가4567)");
    }
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line
  }, []);

  const loginAndFetchNewCsrf = async () => {
    try {
      // 1️⃣ 로그인 전 토큰
      // const { token: preToken, headerName } = await getCsrf();

      // 2️⃣ 로그인
      // await apiClient.post(
      await axios.post(
        // await axios.post(
        `${apiUrl}/api/v1/auth/login`,
        new URLSearchParams({ username: id, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // [headerName]: preToken,
          },
          withCredentials: true,
        }
      );

      // const { token: postToken, headerName: newHeaderName } = await getCsrf();

      // useCsrfStore.getState().setCsrf(postToken, newHeaderName);

      if (
        typeof navigator !== "undefined" &&
        navigator.userAgent.includes("Honors-WebView")
      ) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "LOGIN_SUCCESS",
            userId: id,
          })
        );
        console.log("📡 LOGIN_SUCCESS 메시지 전송 완료");
      }
      router.push("/home");
    } catch (error) {
      console.error("로그인 흐름 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white rounded-t-[32px] w-full px-4 py-8 pb-10">
      <div className="flex flex-col items-center w-full gap-6">
        <div className="flex flex-col w-[95%] gap-1">
          <div className="flex items-center justify-center gap-[30%] mb-1">
            <button
              className={`font-[700] text-md ${
                isSelected == "user" ? "" : "text-[#7E7F83]"
              }`}
              onClick={() => setIsSelected("user")}
            >
              로그인
            </button>
            <button
              className={`font-[700] text-md ${
                isSelected == "guest" ? "" : "text-[#7E7F83]"
              }`}
              onClick={() => setIsSelected("guest")}
            >
              비회원
            </button>
          </div>
        </div>
        {isSelected == "user" ? (
          <div className="userform w-full flex flex-col items-center gap-6">
            <div className="flex flex-col w-[95%] gap-1">
              <span className="text-[#7E7F83]">아이디</span>
              <input
                className="rounded-[12px] border border-1 p-4 focus:placeholder-transparent focus:outline-none focus:border-[#093AEE]"
                placeholder="아이디를 입력해주세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[95%] gap-1">
              <span className="text-[#7E7F83]">비밀번호</span>
              <input
                className="rounded-[12px] border border-1 p-4 focus:placeholder-transparent focus:outline-none focus:border-[#093AEE]"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-[95%] items-center">
              <button
                className="font-[500] text-white bg-[#093AEE] rounded-[3rem] w-full p-5 text-[17px]"
                onClick={loginAndFetchNewCsrf}
              >
                로그인
              </button>
              <button
                className="border border-1 border-[#093AEE] font-[500] text-[#093AEE] p-5 w-full text-[17px] rounded-[3rem]"
                onClick={async () => {
                  try {
                    const { token, headerName } = await getCsrf();
                    useCsrfStore.getState().setCsrf(token, headerName);
                    router.push("/signup");
                  } catch (err) {
                    console.error("회원가입 전 CSRF 토큰 요청 실패:", err);
                    alert(
                      "회원가입 준비 중 문제가 발생했습니다. 다시 시도해주세요."
                    );
                  }
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        ) : (
          <div className="guestform w-full px-2 flex flex-col gap-4">
            <div className="flex flex-col w-full gap-4">
              <span className="text-[1rem] font-[500] text-[#7E7F83]">
                고객님의 차량번호를 입력해주세요
              </span>
              <input
                className="rounded-[12px] border border-1 p-4 focus:placeholder-transparent focus:outline-none focus:border-[#093AEE]"
                placeholder="예: 123가4567"
                value={carNumber} // Controlled Component 유지
                onChange={(e) => setCarNumber(e.target.value)}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className="flex flex-col gap-1 py-6">
              <div className="flex items-center gap-1">
                <Image
                  src="/src/icon/Information.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="font-[700]">유의사항</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#7E7F83]">
                  - 정산 후 30분간 미출차시 추가 요금이 발생할 수 있습니다.
                </span>
                <span className="text-[14px] text-[#7E7F83]">
                  - 주차시간에 대한 요금은 주차장 운영정책에 따라 상이할 수
                  있습니다.
                </span>
              </div>
            </div>
            <button
              className="font-[500] text-white bg-[#093AEE] rounded-[3rem] w-full p-5 text-[17px]"
              onClick={handleSubmit}
            >
              비회원 로그인하기
            </button>
          </div>
        )}
      </div>
      {isSelected == "user" ? <SocialLogin /> : null}
    </div>
  );
}
