import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function ProfileHeader() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/mypage")}
        className="flex items-center p-4 gap-2"
      >
        <MdKeyboardArrowLeft size={20} />
        <span className="font-[500] text-[#2a2a2a] text-[20px]">
          마이페이지
        </span>
      </button>
    </div>
  );
}
