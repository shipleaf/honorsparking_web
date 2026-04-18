import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function PaymentMethod() {
  return (
    <div className="w-full p-4 rounded-[1rem] bg-white flex flex-col gap-4 ">
      <span className="font-[700] text-[17px]">결제수단</span>
      <div className="flex items-center gap-2">
        <input type="radio" />
        <label className="text-[#093AEE] font-[500]">등록된 카드 결제</label>
      </div>
      <span className="pl-6 text-[#64656A]">현대the Green / 456*</span>
      <div className="flex items-center gap-2">
        <input type="radio" />
        <label className="font-[500]">등록된 카드 결제</label>
      </div>
      <button className="flex items-start bg-[#F0F0F0] rounded-[0.5rem] text-[#64656A] py-3 px-4 justify-between">
        <span className="text-md font-[500]">카드 선택</span>
        <MdKeyboardArrowDown color="#4C4D4F" size={24} />
      </button>
    </div>
  );
}
