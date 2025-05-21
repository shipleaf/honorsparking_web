"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FooterNavProps {
  currentpage: "home" | "parking" | "ticket" | "mypage";
}

interface ButtonProps {
  page: "home" | "reservation" | "ticket" | "mypage";
}

export default function FooterNav({ currentpage }: FooterNavProps) {
  const router = useRouter();

  const handleNavigate = ({ page }: ButtonProps) => {
    router.push(page === "home" ? `/home` : `/${page}`);
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[95vw] max-w-[730px] h-[10vh] bg-[#000000C7] flex flex-row justify-between rounded-[2rem] px-[15%] z-[100]">
      <button
        className="flex flex-col justify-center items-center gap-2"
        onClick={() => handleNavigate({ page: "home" })}
      >
        <Image
          src={
            currentpage === "home"
              ? "/src/icon/OnHome.svg"
              : "/src/icon/Home.svg"
          }
          alt=""
          width={24}
          height={24}
        />
        <span
          className={`${
            currentpage === "home" ? "text-white" : "text-[#64656A]"
          } font-[500] text-[14px]`}
        >
          홈
        </span>
      </button>
      <button
        className="flex flex-col justify-center items-center gap-2"
        onClick={() => handleNavigate({ page: "reservation" })}
      >
        <Image
          src={
            currentpage === "parking"
              ? "/src/icon/Parking.svg"
              : "/src/icon/OnParking.svg"
          }
          alt=""
          width={24}
          height={24}
        />
        <span
          className={`${
            currentpage === "parking" ? "text-white" : "text-[#64656A]"
          } font-[500] text-[14px]`}
        >
          주차장
        </span>
      </button>
      <button
        className="flex flex-col justify-center items-center gap-2"
        onClick={() => handleNavigate({ page: "mypage" })}
      >
        <Image
          src={
            currentpage === "mypage"
              ? "/src/icon/OnMyPage.svg"
              : "/src/icon/MyPage.svg"
          }
          alt=""
          width={24}
          height={24}
        />
        <span
          className={`${
            currentpage === "mypage" ? "text-white" : "text-[#64656A]"
          } font-[500] text-[14px]`}
        >
          마이
        </span>
      </button>
    </div>
  );
}
