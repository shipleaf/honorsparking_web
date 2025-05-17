"use client";

import React from "react";
import PhoneAuth from "./components/PhoneAuth";
import ProgressBar from "./components/ProgressBar";
import BottomButton from "./components/BottomButton";
import Agreements from "./components/Agreements";
import { useSignupStageStore } from "@/store/useSignupStore";
import UserInfoInput from "./components/UserInfoInput";
import UserRegister from "./components/UserRegister";

export default function Page() {
  const stage = useSignupStageStore((state) => state.stage);

  return (
    <div className="bg-[#F0F0F0] w-full h-[100vh] space-y-12">
      <ProgressBar />
      {stage === 0 ? (
        <div className="phone">
          <Agreements />
        </div>
      ) : stage === 1 ? (
        <div className="user-info">
          <PhoneAuth />
        </div>
      ) : stage === 2 ? (
        <div className="additional-info">
          <UserInfoInput />
          <BottomButton />
        </div>
      ) : stage === 3 ? (
        <div className="signup-complete">
          <UserRegister />
          <BottomButton />
        </div>
      ) : null}
    </div>
  );
}
