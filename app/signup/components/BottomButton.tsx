"use client";

import React from "react";
import { useSignupStageStore } from "@/store/useSignupStore";

export default function BottomButton() {
  const { stage, nextStage, prevStage } = useSignupStageStore();

  return (
    <div className="fixed bottom-4 w-full px-6 z-100">
      {stage === 0 && (
        <div className="w-full flex justify-center">
          <button
            className="bg-[#093AEE] text-[17px] text-[#fff] font-[500] py-4 w-[80%] rounded-[999px]"
            onClick={nextStage}
          >
            다음으로
          </button>
        </div>
      )}

      {stage === 1 && (
        <div className="w-full flex justify-center">
          <button
            className="bg-[#D2D2D2] text-[17px] text-[#2a2a2a] font-[500] py-4 w-[80%] rounded-[999px]"
            onClick={prevStage}
          >
            이전
          </button>
        </div>
      )}

      {stage === 2 && (
        <div className="w-full flex justify-center">
          <button
            className="bg-[#093AEE] text-[17px] text-[#fff] font-[500] py-4 w-[80%] rounded-[999px]"
            onClick={nextStage}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
