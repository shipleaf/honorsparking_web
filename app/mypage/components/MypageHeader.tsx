"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import SidebarDrawer from "@/app/common/SidebarDrawer";
import { useSidebar } from "@/app/hooks/useSidebar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { fetchMyName } from "@/app/api/MyPageAPI";
import { useRouter } from "next/navigation";
import { checkUnreadAlarm } from "@/app/api/AlarmAPI";
import { useQuery } from "@tanstack/react-query";

export default function MyPageHeader() {
  const { isOpen, open, close } = useSidebar();
  const newNotification = 1;
  const username = "김선엽";

  return (
    <div className="w-full">
      <div className="relative w-full bg-[#2A2A2A] rounded-b-[6%]">
        <div className="flex justify-between items-center p-6 w-full">
          <button onClick={open}>
            <Image
              src="/src/icon/MyPageSideBar.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          <button>
            {newNotification > 0 ? (
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
        <div className="relative pl-6 py-10 w-full overflow-hidden">
          <button className="text-white flex items-center">
            <span className="text-[1.25rem] font-bold">{username} 님</span>
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
        <SidebarDrawer isOpen={isOpen} onClose={close} />
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-white/60">
          <span className="loader !w-[48px] !bg-[#2221d0]"></span>
        </div>
      )}
    </div>
  );
}
