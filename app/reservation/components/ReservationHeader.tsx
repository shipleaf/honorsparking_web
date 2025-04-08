"use client";

import SideBar from "@/app/common/SideBar";
import Image from "next/image";
import React, { useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";

export default function ReservationHeader() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const handleLocationClick = () => {
    setIsLoading(true);

    // 2초 후 로딩 false
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // 위치 요청 메시지 전송 (원한다면 여기에 추가 가능)
    // window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "GET_LOCATION" }));
  };

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-5 items-center p-6 w-full">
        <button className="justify-self-start pl-2" onClick={toggleSideBar}>
          <Image src="/src/icon/SideBar.svg" alt="" width={24} height={24} />
        </button>
        <span className="font-[700] text-center col-span-3">주차장 예약</span>
        <div className="flex items-center justify-end">
          {isLoading ? (
            <div className="loader" ></div>
          ) : (
            <button onClick={handleLocationClick}>
              <TbCurrentLocation size={20} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
          isSideBarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[1000]`}
        onClick={closeSideBar}
      >
        <div
          className={`fixed inset-0 top-0 left-0 shadow-lg transform transition-transform duration-300 w-[80vw] ${
            isSideBarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <SideBar />
        </div>
      </div>
    </div>
  );
}