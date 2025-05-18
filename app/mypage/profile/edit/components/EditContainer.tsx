"use client";

import { fetchMyInfo } from "@/app/api/MyPageAPI";
import { checkPassword } from "@/app/api/UserActivity";
import axios from "axios";
import React, { useState } from "react";
import { UserInfo } from "../../components/MyProfile";
// import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export default function EditContainer() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 상태 추가
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editedInfo, setEditedInfo] = useState<Partial<UserInfo>>({});

  // 패스워드 체크 후 정보 불러오기
  const handleSubmit = async () => {
    try {
      const result = await checkPassword(password);
      if (result.matched) {
        const userData = await fetchMyInfo();
        setUserInfo(userData);
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
      // eslint-disable-next-line
    } catch (err: any) {
      alert(err.response?.data?.message || "오류 발생");
    }
  };

  // 변경 감지 핸들러
  const handleChange = (key: keyof UserInfo, value: string) => {
    if (userInfo && userInfo[key] !== value) {
      setEditedInfo((prev) => ({ ...prev, [key]: value }));
    } else {
      // 변경사항 없을 경우 해당 필드 제거
      setEditedInfo((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  // 수정 요청
  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/v1/mypage/info`, editedInfo, {
        withCredentials: true,
      });
      alert("수정 완료되었습니다.");
      setEditedInfo({});
      const updated = await fetchMyInfo();
      setUserInfo(updated);
    } catch {
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {!userInfo && (
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 mb-2 rounded-[10px] focus:border-[#093AEE] outline-none text-sm"
          />
          {error && <p className="text-sm text-red-500 mb-4 w-full">{error}</p>}
          <button
            className="w-full bg-[#093AEE] text-white py-3 rounded-full font-medium mt-4"
            onClick={handleSubmit}
          >
            입력하기
          </button>
        </div>
      )}
      {userInfo && (
        <div className="flex flex-col gap-4 mt-6 w-full px-4">
          <label className="text-sm text-gray-600">이름</label>
          <input
            defaultValue={userInfo.userName || ""}
            onChange={(e) => handleChange("userName", e.target.value)}
            className="border p-2 rounded"
          />

          <label className="text-sm text-gray-600">전화번호</label>
          <input
            defaultValue={userInfo.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="border p-2 rounded"
          />

          <label className="text-sm text-gray-600">Email</label>
          <input
            defaultValue={userInfo.email || ""}
            onChange={(e) => handleChange("carNumber", e.target.value)}
            className="border p-2 rounded"
          />

          <button
            className={`mt-4 p-3 rounded-full ${
              Object.keys(editedInfo).length > 0
                ? "bg-[#093AEE] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSave}
            disabled={Object.keys(editedInfo).length === 0}
          >
            수정하기
          </button>
        </div>
      )}
    </>
  );
}
