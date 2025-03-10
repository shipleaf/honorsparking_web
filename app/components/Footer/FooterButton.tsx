"use client";

import React from "react";

export default function FooterButton() {
  const pdfUrl = "/docs/아너스코리아 개인정보처리방침.pdf";
  return (
    <div className="flex flex-row gap-2 p-8 text-[#FFFFFF] font-[300]">
      {/* <button className=''>이용약관</button>
      <span className='text-[#ACAFB3]'>|</span> */}
      <span className='text-[#ACAFB3]'>|</span>
      <button onClick={() => window.open(pdfUrl, "_blank")}>개인정보처리방침</button>
      {/* <span className='text-[#ACAFB3]'>|</span>
      <button>공지사항</button> */}
    </div>
  );
}