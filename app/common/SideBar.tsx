"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function SideBar() {
  // const [isTicketOpen, setIsTicketOpen] = useState(true);
  const [isParkingOpen, setIsParkingOpen] = useState(true);
  const [isCardOpen, setIsCardOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);

  // const handleOpenTicket = () => {
  //   setIsTicketOpen((prev) => !prev);
  // };

  const handleOpenParking = () => {
    setIsParkingOpen((prev) => !prev);
  };

  const handleOpenCard = () => {
    setIsCardOpen((prev) => !prev);
  };

  const handleOpenNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <div className="bg-white w-[80vw] max:w-[614px] h-[100vh] overflow-y-auto scrollbar-hide">
      <div className="px-6 py-12 pt-[70px] space-y-10">
        <span className="font-[700] text-lg">HONORS KOREA</span>
        {/* <div className="flex flex-col">
          <button
            className="flex flex-row w-full items-center justify-between z-10"
            onClick={handleOpenTicket}
          >
            <div className="flex flex-row gap-2 font-[700] items-center">
              <Image
                src="/src/icon/OnTicket.svg"
                alt=""
                width={20}
                height={24}
              />
              <span className="text-md">이용권</span>
            </div>
            {isTicketOpen ? (
              <MdKeyboardArrowUp size={28} color="#ACAFB3" />
            ) : (
              <MdKeyboardArrowDown size={28} color="#ACAFB3" />
            )}
          </button>
          <div
            className={`flex flex-col gap-6 items-start pt-6 pl-8 transform transition-all duration-300 overflow-hidden z-9 ${
              isTicketOpen ? "translate-y-0 h-auto" : "-translate-y-4 h-0"
            }`}
          >
            <button className="text-[#64656A] text-md">할인권 구매</button>
            <button className="text-[#64656A] text-md">정기권 구매</button>
            <button className="text-[#64656A] text-md">할인권 조회</button>
            <button className="text-[#64656A] text-md">정기권 구매</button>
          </div>
        </div> */}
        <div>
          <button
            className="flex flex-row w-full items-center justify-between"
            onClick={handleOpenParking}
          >
            <div className="flex flex-row gap-2 font-[700] items-center">
              <Image
                src="/src/icon/Parking.svg"
                alt=""
                width={20}
                height={24}
              />
              <span>주차장</span>
            </div>
            {isParkingOpen ? (
              <MdKeyboardArrowUp size={28} color="#ACAFB3" />
            ) : (
              <MdKeyboardArrowDown size={28} color="#ACAFB3" />
            )}
          </button>
          <div
            className={`flex flex-col gap-6 items-start pt-6 pl-8 transform transition-all duration-300 overflow-hidden z-9 ${
              isParkingOpen ? "translate-y-0 h-auto" : "-translate-y-4 h-0"
            }`}
          >
            <button className="text-[#64656A] text-md">주차장 예약</button>
            <button className="text-[#64656A] text-md">주차장 이용 조회</button>
            <button className="text-[#64656A] text-md">
              즐겨찾기한 주차장
            </button>
          </div>
        </div>
        <div>
          <button
            className="flex flex-row items-center justify-between w-full"
            onClick={handleOpenCard}
          >
            <div className="flex flex-row gap-2 font-[700] items-center justify-center">
              <Image src="/src/icon/Card.svg" alt="" width={20} height={24} />
              <span>결제</span>
            </div>
            {isCardOpen ? (
              <MdKeyboardArrowUp size={28} color="#ACAFB3" />
            ) : (
              <MdKeyboardArrowDown size={28} color="#ACAFB3" />
            )}
          </button>
          <div
            className={`flex flex-col gap-6 items-start pt-6 pl-8 transform transition-all duration-300 overflow-hidden z-9 ${
              isCardOpen ? "translate-y-0 h-auto" : "-translate-y-4 h-0"
            }`}
          >
            <button className="text-[#64656A] text-md">카드 등록</button>
            <button className="text-[#64656A] text-md">사전 결제</button>
            <button className="text-[#64656A] text-md">미납 상태</button>
            <button className="text-[#64656A] text-md">결제 내역</button>
          </div>
        </div>
        <div className="relative">
          <button
            className="flex flex-row items-center justify-between w-full py-2"
            onClick={handleOpenNotification}
          >
            <div className="flex flex-row gap-2 font-[700] items-center justify-center">
              <Image
                src="/src/icon/OnNotification.svg"
                alt=""
                width={20}
                height={24}
              />
              <span>알람</span>
            </div>
            {isNotificationOpen ? (
              <MdKeyboardArrowUp size={28} color="#ACAFB3" />
            ) : (
              <MdKeyboardArrowDown size={28} color="#ACAFB3" />
            )}
          </button>
          <div
            className={`flex flex-col gap-6 items-start pt-6 pl-8 transform transition-all duration-300 overflow-hidden z-9 ${
              isNotificationOpen ? "translate-y-0 h-auto" : "-translate-y-4 h-0"
            }`}
          >
            <button className="text-[#64656A] text-md">알림 확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}
