"use client";

import React from "react";
import ExtraAgreements from "./components/ExtraAgreements";
import { useSignupStageStore } from "@/store/useSignupStore";
import ExtraUserInfo from "./components/ExtraUserInfo";

export default function Page() {
  const stage = useSignupStageStore((state) => state.stage);
  return (
    <div className="bg-[#F0F0F0] w-full h-[100vh] pt-12">
      {stage === 0 ? (
        <div className="phone">
          <ExtraAgreements />
        </div>
      ) : stage === 1 ? (
        <div className="user-info">
          <ExtraUserInfo />
        </div>
      ) : stage === 2 ? (
        <div className="additional-info">
        </div>
      ) : stage === 3 ? (
        <div className="signup-complete">
        </div>
      ) : null}
    </div>
  );
}