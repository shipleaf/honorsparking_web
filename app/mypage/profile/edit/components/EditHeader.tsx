"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function EditHeader() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center p-4 gap-2"
      >
        <MdKeyboardArrowLeft size={20} />
        <span className="font-[500] text-[#2a2a2a] text-[20px]">
          회원정보 수정
        </span>
      </button>
    </div>
  );
}
