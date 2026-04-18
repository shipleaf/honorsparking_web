"use client";

import { useRouter } from "next/navigation";

export default function LoginCaution() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-white z-[1000]">
      <div
        className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="bg-white p-10 pb-4 rounded-[16px] w-[90%] max-w-md">
          <h2 className="text-[17px] font-[700] mb-4 text-center">
            로그인 후 이용 가능합니다.
          </h2>
          <div className="w-full mt-6">
            <button
              className="rounded-[999px] bg-[#093AEE] p-4 px-12 w-full text-white font-[500]"
              onClick={() => {
                router.push("/login");
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
