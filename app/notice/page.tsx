"use client";

import React, { Suspense } from "react";
import NoticeHeader from "./components/NoticeHeader";
import NoticeContainer from "./components/NoticeContainer";

export default function page() {
  return (
    <Suspense>
      <div className="bg-[#fff] h-[100vh] w-[100vw]">
        <NoticeHeader />
        <div className="px-6 w-full">
          <NoticeContainer />
        </div>
      </div>
    </Suspense>
  );
}
