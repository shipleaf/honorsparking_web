"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { logout } from "@/apis/auth/auth.api";
import DecisionModal from "@/app/components/modal/DecisionModal";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export default function MyMenu() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/notice");
  };
  const navigatePayInfo = () => {
    router.push("/payment-info");
  };

  const [isLogoutTry, setIsLogoutTry] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/v1/session/info`, {
        credentials: "include",
      });
      const data = await res.json();
      const userId = data.userName;

      await logout();

      if (navigator.userAgent.includes("Honors-WebView")) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: "LOGOUT", userId })
        );
      }
      setIsLogoutTry(false);
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      setIsLogoutTry(false);
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
          onClick={() => setIsLogoutTry(true)}
        >
          <span className="font-[600] text-[#2A2A2A] text-[17px]">
            로그아웃
          </span>
          <MdKeyboardArrowRight size={20} />
        </button>
      </div>
      {isLogoutTry && (
        <div>
          <DecisionModal
            title="정말 로그아웃 하시겠습니까?"
            body=""
            onWork={() => handleLogout()}
            onClose={() => setIsLogoutTry(false)}
          />
        </div>
      )}
    </div>
  );
}
