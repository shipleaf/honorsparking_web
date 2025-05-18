import React from "react";

export default function EditContainer() {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h2 className="text-base font-semibold mb-2 text-gray-900">
        회원정보를 수정하시겠습니까?
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        회원정보를 수정하시려면{" "}
        <span className="font-medium">비밀번호를 입력해 주세요.</span>
      </p>
      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        className="w-full border border-gray-300 p-3 mb-6 rounded-[10px] focus:border-[#093AEE] outline-none text-sm"
      />
      <button className="w-full bg-[#093AEE] text-white py-3 rounded-full font-medium">
        입력하기
      </button>
    </div>
  );
}
