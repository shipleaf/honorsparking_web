import React from "react";
import NoticeHeader from "./components/NoticeHeader";
import NoticeContainer from "./components/NoticeContainer";

export default function page() {
  return (
    <div className="bg-[#fff] h-[100vh] w-[100vw]">
      <NoticeHeader />
      <div className="px-6 w-full">
        <NoticeContainer />
      </div>
    </div>
  );
}
