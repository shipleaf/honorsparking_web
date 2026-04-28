import React, { useEffect, useState } from "react";
import { fetchMyInfo } from "@/apis/user/MyPageAPI";

type UserInfo = {
  userName: string | null;
  authId: string | null;
  phoneNumber: string | null;
  email: string | null;
  birthdayYear: number | null;
  birthday: string | null;
  loginPlatform: string | null;
  carNumber: string | null;
};

export default function ExtraUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMyInfo();
      setUserInfo(data);
    };

    fetchData();
  }, []);

  const renderInput = (
    label: string,
    value: UserInfo[keyof UserInfo],
    // eslint-disable-next-line
    key: keyof UserInfo
  ) => {
    const isEditable = value === null || value === "" || value === 0;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="text"
          defaultValue={value ?? ""}
          disabled={!isEditable}
          className={`w-full px-4 py-2 rounded-md border text-sm ${
            isEditable
              ? "bg-white text-black border-gray-300"
              : "bg-[#f0f0f0] text-gray-500 border-gray-300 cursor-not-allowed"
          }`}
        />
      </div>
    );
  };

  if (!userInfo) return <div className="p-6">로딩 중...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      {renderInput("이름", userInfo.userName, "userName")}
      {renderInput("전화번호", userInfo.phoneNumber, "phoneNumber")}
      {renderInput("이메일", userInfo.email, "email")}
      {renderInput("생년", userInfo.birthdayYear, "birthdayYear")}
      {renderInput("생일", userInfo.birthday, "birthday")}
      {renderInput("차량번호", userInfo.carNumber, "carNumber")}
    </div>
  );
}
