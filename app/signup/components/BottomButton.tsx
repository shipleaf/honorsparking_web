"use client";

import React from "react";
import { useSignupStageStore } from "@/store/useSignupStore";
import Button from "@/app/components/ui/Button";

export default function BottomButton() {
  const { stage, nextStage, prevStage } = useSignupStageStore();

  return (
    <div className="fixed bottom-4 w-full px-6 z-100">
      <div className="w-full flex justify-center">
        {(stage === 0 || stage === 2) && (
          <Button variant="primary" className="w-[80%]" onClick={nextStage}>
            {stage === 0 ? "다음으로" : "다음"}
          </Button>
        )}
        {stage === 1 && (
          <Button variant="secondary" className="w-[80%]" onClick={prevStage}>
            이전
          </Button>
        )}
      </div>
    </div>
  );
}
