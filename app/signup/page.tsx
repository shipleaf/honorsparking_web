import React from "react";
import PhoneAuth from "./components/PhoneAuth";
import ProgressBar from "./components/ProgressBar";
import BottomButton from "./components/BottomButton";
import Agreements from "./components/Agreements";

export default function page() {
  return (
    <div className="bg-[#F0F0F0] h-[100vh] w-full space-y-6">
      <ProgressBar />
      <PhoneAuth />
      <Agreements />
      <BottomButton />
    </div>
  );
}