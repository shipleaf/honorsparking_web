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
  const newNotification = 1;

  const { isLoading, isError } = useQuery({
    queryKey: ["sessionInfo"],
    queryFn: fetchSessionInfo,
    retry: false, // 실패 시 재시도를 원하지 않으면 false 설정
  });

  // ✅ 로딩이 끝난 후 에러 발생 시 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/login");
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

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const res = await axios.get(`${apiUrl}/api/v1/alarmAll`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true, // 서버로 보내는 요청만 포함되는 옵션이라고 생각해서 제외했는데 받을때도 헤더에 포함된 쿠키를 저장하려면 해당 옵션을 사용해야 함.
  //       });
  //       if (res.status == 200) {
  //         setIsAuthenticated(true); // 성공하면 인증된 상태로 설정
  //       }
  //     } catch {}
  //   };
  //   checkSession();
  //   // eslint-disable-next-line
  // }, []);

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
        <button className="justify-self-end">
          {newNotification > 0 ? (
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
    </div>
  ); // 인증 안 된 상태면 아무것도 렌더링 안 함
}
