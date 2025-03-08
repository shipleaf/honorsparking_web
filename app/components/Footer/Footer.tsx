import React from "react";
import FooterButton from "./FooterButton";

export default function Footer() {
  return (
    <div className="bg-[#2A2A2A] flex flex-col pb-[15vh]">
      <FooterButton />
      <div className="text-[#C5C8CB] text-sm font-[300] flex flex-col px-8 gap-1">
        <span>(주)어반스골드 | 사업자등록번호 : 237-81-01497</span>
        <span>주소 : 경기도 성남시 중원구 갈마치로 215, 지3층 301호</span>
        <span>이메일 : dla9319@korea.ac.kr</span>
      </div>
    </div>
  );
}