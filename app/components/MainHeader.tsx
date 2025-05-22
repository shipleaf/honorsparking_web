"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBar from "../common/SideBar";
import { useRouter } from "next/navigation";
import { fetchSessionInfo } from "../api/UserActivity";
import { useQuery } from "@tanstack/react-query";
import LoginCaution from "./login/LoginCaution";
import { checkUnreadAlarm } from "../api/AlarmAPI";

export default function MainHeader() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
  const [isLoginModal, setIsLoginModal] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sessionInfo"],
    queryFn: fetchSessionInfo,
    retry: false,
  });

  useEffect(() => {
    if (
      !isLoading &&
      data?.principal?.authorities?.[0]?.authority === "ROLE_NONE"
    ) {
      router.push("/signup/extra");
    }
  }, [isLoading, data, router]);

  const {
    data: unreadAlarmData,
    isLoading: isUnreadLoading,
    isError: isUnreadError,
  } = useQuery({
    queryKey: ["unreadAlarm"],
    queryFn: checkUnreadAlarm,
    retry: 1,
    enabled: isClient, // SSR에서 막기
  });

  // 로그인 상태 체크 후 실패시 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoading && isError) {
      setIsLoginModal(true);
      // router.push("/login");
    }
  }, [isLoading, isError, router]);

  // isLoading일 때, 로딩 스피너
  if (!isClient || isLoading || isUnreadLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-[#fff]">
        <span className="loader !w-[48px] !bg-[#2221d0]"></span>
      </div>
    );
  }

  const toggleSideBar = () => setIsSideBarOpen(true);
  const closeSideBar = () => setIsSideBarOpen(false);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-5 items-center p-6 w-full">
        <button className="justify-self-start pl-2" onClick={toggleSideBar}>
          <Image src="/src/icon/SideBar.svg" alt="" width={24} height={24} />
        </button>
        <span className="font-[700] text-center col-span-3">HONORS KOREA</span>
        <button
          className="justify-self-end"
          onClick={() => router.push("/notice?page=1")}
        >
          {isUnreadError && unreadAlarmData.hasUnread ? (
            <Image
              src="/src/icon/NewNotification.svg"
              alt=""
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/src/icon/Notification.svg"
              alt=""
              width={24}
              height={24}
            />
          )}
        </button>
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
      {isLoginModal && <LoginCaution />}
    </div>
  );
}
