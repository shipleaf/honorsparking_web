"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import SideBar from "@/app/common/SideBar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { fetchMyName } from "@/app/api/MyPageAPI";
import { useRouter } from "next/navigation";
import { checkUnreadAlarm } from "@/app/api/AlarmAPI";
import { useQuery } from "@tanstack/react-query";

export default function MyPageHeader() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: unreadAlarmData,
    isLoading: isUnreadLoading,
    isError: isUnreadError,
  } = useQuery({
    queryKey: ["unreadAlarm"],
    queryFn: checkUnreadAlarm,
    retry: 1,
  });

  const toggleSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const namePromise = fetchMyName();
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

        const [name] = await Promise.all([namePromise, delayPromise]);
        setUsername(name.username);
      } catch (err) {
        console.error("이름 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsername();
  }, []);

  if (isLoading || isUnreadLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-[#fff]">
        <span className="loader !w-[48px] !bg-[#2221d0]"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full bg-[#2A2A2A] rounded-b-[6%]">
        <div className="flex justify-between items-center p-6 w-full">
          <button className="justify-self-start" onClick={toggleSideBar}>
            <Image
              src="/src/icon/MyPageSideBar.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          <button
            className="justify-self-end"
            onClick={() => router.push("/notice?page=1")}
          >
            {isUnreadError && unreadAlarmData > 0 ? (
              <Image
                src="/src/icon/MyPageNewNotification.svg"
                alt=""
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/src/icon/MyPageNotification.svg"
                alt=""
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
        {!isLoading ? (
          <div className="relative pl-6 py-10 w-full overflow-hidden">
            <button
              className="text-white flex items-center"
              onClick={() => router.push("/mypage/profile")}
            >
              <span className="text-[1.25rem] font-[700]">{username} 님</span>
              <MdKeyboardArrowRight size={20} />
            </button>
            <Image
              src="/src/image/MyPageCar.png"
              alt=""
              width={250}
              height={20}
              className="absolute bottom-0 right-0"
            />
          </div>
        ) : (
          <div className="relative pl-6 py-10 w-full overflow-hidden"></div>
        )}

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
      {isLoading && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-white/60">
          <span className="loader !w-[48px] !bg-[#2221d0]"></span>
        </div>
      )}
    </div>
  );
}
