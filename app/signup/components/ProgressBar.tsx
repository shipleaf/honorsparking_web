"use client";

import React from "react";
import { useSignupStageStore } from "@/store/useSignupStore";

export default function ProgressBar() {
  const stage = useSignupStageStore((state) => state.stage); // 상태 변경 감지

  console.log("Signup Stage: ", stage);

  const progressWidth = `${(stage + 1) * 25}%`;

  return (
    <div className="bg-[#D0E2FF] w-full h-2 relative">
      <div
        className="absolute bg-[#093AEE] h-full rounded-r-[10px] transition-all duration-300"
        style={{ width: progressWidth }}
      ></div>
    </div>
  );
}