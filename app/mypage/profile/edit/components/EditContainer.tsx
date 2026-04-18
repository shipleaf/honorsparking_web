"use client";

import { fetchMyInfo, updateMyInfo } from "@/app/api/MyPageAPI";
import { checkPassword } from "@/app/api/UserActivity";
import axios from "axios";
import React, { useState } from "react";
import { UserInfo } from "../../components/MyProfile";
import CautionModal from "@/app/components/modal/CautionModal";
// import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export default function EditContainer() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 상태 추가
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editedInfo, setEditedInfo] = useState<Partial<UserInfo>>({});
  const [editCarNumberModal, setEditCarNumberModal] = useState(false);
  const [showCarInputModal, setShowCarInputModal] = useState(false);
  const [carInput, setCarInput] = useState("");
  const [carInputError, setCarInputError] = useState("");
  const [showCautionModal, setShowCautionModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateCarNumber = (value: string) => {
    const regex = /^[0-9]{2,3}[가-힣]{1}[0-9]{4}$/;
    return regex.test(value);
  };

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
          <div className="flex flex-col gap-2">
            <button
              className={`mt-4 p-3 rounded-full bg-[#35CAF4] text-white`}
              onClick={() => setEditCarNumberModal(true)}
            >
              차량번호 변경하기
            </button>
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
          {editCarNumberModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl p-6 w-[360px] max-w-[90%] shadow-lg text-center">
                <h2 className="text-base font-semibold mb-2 text-gray-900">
                  차량번호를 변경하시겠습니까?
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  현재 차량번호는{" "}
                  <span className="font-medium text-black">
                    {userInfo.carNumber || "없음"}
                  </span>{" "}
                  입니다.
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  차량번호는{" "}
                  <span className="font-medium text-[#093AEE]">
                    30일에 한 번
                  </span>
                  만 변경할 수 있습니다.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                    onClick={() => {
                      setEditCarNumberModal(false);
                      setCarInput("");
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="flex-1 bg-[#093AEE] text-white py-3 rounded-full font-medium hover:bg-[#072fcc] transition"
                    onClick={() => {
                      setEditCarNumberModal(false);
                      setShowCarInputModal(true); // 👉 다음 모달 열기
                    }}
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}{" "}
          {showCarInputModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl p-6 w-[360px] max-w-[90%] shadow-lg text-center">
                <h2 className="text-base font-semibold mb-2 text-gray-900">
                  차량번호를 입력해 주세요
                </h2>
                <input
                  type="text"
                  placeholder="예: 123가4567"
                  value={carInput}
                  onChange={(e) => {
                    setCarInput(e.target.value);
                    setCarInputError("");
                  }}
                  className="w-full border border-gray-300 p-3 mb-2 rounded focus:border-[#093AEE] outline-none text-sm"
                />
                {carInputError && (
                  <p className="text-sm text-red-500 mb-2">{carInputError}</p>
                )}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                    onClick={() => setShowCarInputModal(false)}
                  >
                    취소
                  </button>
                  <button
                    className="flex-1 bg-[#093AEE] text-white py-3 rounded-full font-medium hover:bg-[#072fcc] transition"
                    onClick={async () => {
                      if (!validateCarNumber(carInput)) {
                        setCarInputError("차량번호 형식이 올바르지 않습니다.");
                        return;
                      }

                      try {
                        await updateMyInfo(carInput);
                        setModalMessage("차량번호가 변경되었습니다.");
                        setShowCautionModal(true);
                        const updated = await fetchMyInfo();
                        setUserInfo(updated);
                        setShowCarInputModal(false);
                        setCarInput("");
                      } catch {
                        setModalMessage(
                          "차량번호는 30일에 한 번 변경 가능합니다."
                        );
                        setShowCautionModal(true);
                      }
                    }}
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {showCautionModal && (
        <CautionModal
          title={modalMessage}
          body=""
          onClose={() => {
            setShowCarInputModal(false);
            setShowCautionModal(false);
            setModalMessage("");
            setCarInput("");
          }}
        />
      )}
    </>
  );
}
