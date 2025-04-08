"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
// import ReservationList from "./ReservationList";

export default function ReservationSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  // const [searchInput, setSearchInput] = useState("");
  return (
    <div>
      <div
        className={`w-full flex flex-row bg-white py-4 px-3 rounded-[12px] items-center gap-1 ${
          isFocused ? "border border-1 border-[#093AEE]" : "border"
        }`}
      >
        <Image src="/src/icon/Search.svg" alt="" width={24} height={24} />
        <input
          className="focus:outline-none"
          placeholder="주소 또는 주차장 이름 검색"
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {/* {isFocused ? (
        <div className="font-[700] text-lg mt-8 mb-6">검색 결과</div>
      ) : (
        <div className="font-[700] text-lg mt-8 mb-6">예약 가능한 주차장</div>
      )}
      {isFocused && searchInput && (
        <ReservationList />
      )}
      {!isFocused ? <ReservationList /> : ""} */}
    </div>
  );
}