import { fetchMyInfo } from "@/app/api/MyPageAPI";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";

export type UserInfo = {
  userName: string;
  authId: string;
  phoneNumber: string;
  email: string;
  birthdayYear: number;
  birthday: string;
  loginPlatform: string;
  carNumber: string;
};

export default function MyProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const [data] = await Promise.all([
          fetchMyInfo(),
          new Promise((r) => setTimeout(r, 500)), // 최소 0.5초 로딩
        ]);
        setUserInfo(data);
      } catch (e) {
        console.error("유저 정보 불러오기 실패:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
        <span className="loader !w-[48px] !bg-[#2221d0]"></span>
      </div>
    );
  }

  if (!userInfo)
    return <div className="p-6">유저 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start px-6 gap-6">
        <Image
          src="/src/image/HonorsImage.png"
          alt=""
          width={64}
          height={64}
          className="rounded-full"
        />
        <span className="font-[600] text-[#2a2a2a] text-[20px]">
          {userInfo.userName}님<br /> 반갑습니다!
        </span>
      </div>
      <div className="px-6 flex items-center w-full justify-between">
        <span>내 프로필</span>
        <button
          className="text-[#093AEE] flex items-center font-[700] text-[14px]"
          onClick={() => router.push("/mypage/profile/edit")}
        >
          <span>회원정보 수정</span>
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="flex flex-col px-6 gap-3">
        {[
          { label: "이름", value: userInfo.userName },
          {
            label: "아이디",
            value: (() => {
              const platformPrefixes = ["kakao", "naver", "google"];
              const matched = platformPrefixes.find((prefix) =>
                userInfo.authId.startsWith(prefix)
              );
              return matched ?? userInfo.authId;
            })(),
          },
          { label: "이메일", value: userInfo.email },
          { label: "연락처", value: userInfo.phoneNumber },
          {
            label: "생년월일",
            value:
              userInfo.birthdayYear && userInfo.birthday
                ? `${userInfo.birthdayYear}-${userInfo.birthday.slice(
                    0,
                    2
                  )}${userInfo.birthday.slice(2)}`
                : "-",
          },
        ].map((item) => (
          <div key={item.label} className="flex text-[14px] text-[#2a2a2a]">
            <span className="text-[#999] min-w-[80px]">{item.label}</span>
            <span className="font-[600]">{item.value || "-"}</span>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex justify-between">
        <div className="px-6 space-x-6">
          <span className="text-[#999]">차량번호</span>
          <span>{userInfo.carNumber}</span>
        </div>
      </div>
    </div>
  );
}
