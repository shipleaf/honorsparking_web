"use client";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { logout } from "@/app/api/useSocialLoginAPI";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export default function MyMenu() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/notice");
  };

  const navigatePayInfo = () => {
    router.push("/payment-info");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/v1/session/info`, {
        credentials: "include",
      });
      const data = await res.json();
      const userId = data.userName;

      await logout();

      // 3. 앱이면 메시지 전송
      if (navigator.userAgent.includes("Honors-WebView")) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: "LOGOUT", userId })
        );
      }
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="px-6 w-full space-y-4">
      <span className="font-[700] text-[1.25rem]">마이메뉴</span>
      <div className="flex flex-col gap-3 w-full">
        <button
          className="flex justify-between items-center bg-white rounded-[12px] p-4"
          onClick={handleNavigate}
        >
          <span className="font-[600] text-[#2A2A2A] text-[17px]">알림</span>
          <MdKeyboardArrowRight size={20} />
        </button>
        <button
          className="flex justify-between items-center bg-white rounded-[12px] p-4"
          onClick={navigatePayInfo}
        >
          <span className="font-[600] text-[#2A2A2A] text-[17px]">
            결제 정보
          </span>
          <MdKeyboardArrowRight size={20} />
        </button>
        {/* <button className="flex justify-between items-center bg-white rounded-[12px] p-4">
          <span className="font-[600] text-[#2A2A2A] text-[17px]">
            보유중인 이용권
          </span>
          <MdKeyboardArrowRight size={20} />
        </button> */}
        <button
          className="flex justify-between items-center bg-white rounded-[12px] p-4"
          onClick={() => router.push("/history")}
        >
          <span className="font-[600] text-[#2A2A2A] text-[17px]">
            주차장 이용내역
          </span>
          <MdKeyboardArrowRight size={20} />
        </button>
        <button className="flex justify-between items-center bg-white rounded-[12px] p-4">
          <span className="font-[600] text-[#2A2A2A] text-[17px]">
            문의하기
          </span>
          <MdKeyboardArrowRight size={20} />
        </button>
        <button
          className="flex justify-between items-center bg-white rounded-[12px] p-4"
          onClick={handleLogout}
        >
          <span className="font-[600] text-[#2A2A2A] text-[17px]">
            로그아웃
          </span>
          <MdKeyboardArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
