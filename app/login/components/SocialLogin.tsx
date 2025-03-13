"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;
  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push(`${apiUrl}/api/v1/auth/login/oauth/kakao`);
  };

  const handleNaverLogin = () => {
    router.push(`${apiUrl}/api/v1/auth/login/oauth/naver`);
  };

  const handleGoogleLogin = () => {
    router.push(`${apiUrl}/api/v1/auth/login/oauth/google`);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10">
      <span className="text-[#7E7F83] text-[16px] font-[500]">
        SNS로 간편하게 시작하기
      </span>
      <div className="flex flex-row gap-8">
        <button onClick={handleKakaoLogin}>
          <Image
            src="/src/image/KakaoLogin.png"
            alt=""
            width={60}
            height={50}
          />
        </button>
        <button onClick={handleNaverLogin}>
          <Image
            src="/src/image/NaverLogin.png"
            alt=""
            width={60}
            height={50}
          />
        </button>
        <button onClick={handleGoogleLogin}>
          <Image
            src="/src/image/GoogleLogin.png"
            alt=""
            width={60}
            height={50}
          />
        </button>
      </div>
    </div>
  );
}
