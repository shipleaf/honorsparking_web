"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBar from "../common/SideBar";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

const fetchSessionInfo = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/session/info`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return res.data;
};

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export default function MainHeader() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
  const unreadCount = 1;

  const [isLoginModal, setIsLoginModal] = useState(false);

  const { isLoading, isError } = useQuery({
    queryKey: ["sessionInfo"],
    queryFn: fetchSessionInfo,
    retry: false,
  });

  // ✅ 로딩이 끝난 후 에러 발생 시 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoading && isError) {
      setIsLoginModal(true);
      // router.push("/login");
    }
  }, [isLoading, isError, router]);

  // 🔹 isLoading 상태일 때 ClipLoader를 표시 (화면 중앙)
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-[#fff]">
        <ClipLoader size={48} color="#2221d0" />
      </div>
    );
  }

  // 현재 알림 개수를 로컬스토리지를 통해 캐싱, 비교 후 새로운 알림이 있는지 확인

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
          {unreadCount > 0 ? (
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
      {isLoginModal && (
        <div className="fixed inset-0 bg-white z-[1000]">
          <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-white p-10 pb-4 rounded-[16px] w-[90%] max-w-md">
              <h2 className="text-[17px] font-[700] mb-4 text-center">
                로그인 후 이용 가능합니다.
              </h2>
              <div className="w-full mt-6">
                <button
                  className="rounded-[999px] bg-[#093AEE] p-4 px-12 w-full text-white font-[500]"
                  onClick={() => {
                    router.push("login");
                  }}
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}