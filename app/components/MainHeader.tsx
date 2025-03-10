"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBar from "../common/SideBar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function MainHeader() {
  const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const newNotification = 1;

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/session/info`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 서버로 보내는 요청만 포함되는 옵션이라고 생각해서 제외했는데 받을때도 헤더에 포함된 쿠키를 저장하려면 해당 옵션을 사용해야 함.
        });
        if (res.status == 200) {
          setIsAuthenticated(true); // 성공하면 인증된 상태로 설정
        }
      } catch {
        router.push('/login');
      }
    };
    checkSession();
    // eslint-disable-next-line
  }, []);

  const toggleSideBar = () => setIsSideBarOpen(true);
  const closeSideBar = () => setIsSideBarOpen(false);

  return isAuthenticated ? (
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
  ) : null; // 인증 안 된 상태면 아무것도 렌더링 안 함
}
