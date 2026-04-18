"use client";

import React from "react";
import Image from "next/image";
import SidebarDrawer from "@/app/common/SidebarDrawer";
import { useSidebar } from "@/app/hooks/useSidebar";

export default function ReservationHeader() {
  const { isOpen, open, close } = useSidebar();

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-5 items-center p-6 w-full">
        <button className="justify-self-start pl-2" onClick={open}>
          <Image src="/src/icon/SideBar.svg" alt="" width={24} height={24} />
        </button>
        <span className="font-bold text-center col-span-3">주차장 예약</span>
      </div>
      <SidebarDrawer isOpen={isOpen} onClose={close} />
    </div>
  );
}
