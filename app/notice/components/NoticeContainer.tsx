"use client";

import React, { Suspense, useEffect, useState } from "react";
import NoticeComponent from "./NoticeComponent";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PageButton from "./PageButton";
import { deleteSelectedAlarms, readSelectedAlarms } from "@/apis/user/AlarmAPI";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

interface ButtonState {
  buttonSelected: "Default" | "InOut" | "RESERVE" | "Payment";
}

export interface NoticeContainerProps {
  message: {
    alarms: {
      id: number;
      content: string;
      isRead: string;
      alarmType: "PAYMENT" | "INOUT" | "RESERVE";
      createdAt: string;
    }[];
    pagination: {
      totalPages: number;
      pageSize: number;
      totalItems: number;
      currentPage: number;
    };
  };
}

export default function NoticeContainer() {
  const router = useRouter();
  const [buttonSelected, setButtonSelected] = useState<ButtonState>({
    buttonSelected: "Default",
  });

  const [onCheck, setOnCheck] = useState(false);

  const [message, setMessage] = useState<NoticeContainerProps["message"]>({
    alarms: [],
    pagination: {
      totalPages: 0,
      pageSize: 0,
      totalItems: 0,
      currentPage: 0,
    },
  });

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const category = searchParams.get("category") || "Default";
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleButtonSelect = (
    state: "Default" | "InOut" | "RESERVE" | "Payment"
  ) => {
    setButtonSelected({ buttonSelected: state });

    const categoryParam = state.toUpperCase(); // API에서 요구하는 대문자 형식
    const query =
      categoryParam === "DEFAULT"
        ? `?page=1`
        : `?page=1&category=${categoryParam}`;

    router.replace(`/notice${query}`);
  };

  let backgroundClass = "";
  switch (buttonSelected.buttonSelected) {
    case "Default":
      backgroundClass = "left-[1%]";
      break;
    case "InOut":
      backgroundClass = "left-[25%]";
      break;
    case "RESERVE":
      backgroundClass = "left-[50%]";
      break;
    case "Payment":
      backgroundClass = "left-[74%]";
      break;
  }

  const fetchAlarms = async () => {
    try {
      const baseUrl = `${apiUrl}/api/v1/alarmAll?page=${page}`;
      const url =
        category === "Default" ? baseUrl : `${baseUrl}&category=${category}`;

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setMessage(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setOnCheck(false);
    setSelectedIds([]);
    fetchAlarms();
    // eslint-disable-next-line
  }, [page, category]);

  const handleCancel = () => {
    setOnCheck(false);
    setSelectedIds([]);
  };

  const handleReadAlarms = async () => {
    try {
      if (selectedIds.length === 0) return;
      await readSelectedAlarms(selectedIds); // ✅ API 호출
      alert("선택한 알림을 읽음 처리했어요.");
      setOnCheck(false);
      setSelectedIds([]);
      await fetchAlarms();
    } catch (error) {
      console.error("📛 읽기 처리 중 오류:", error);
      alert("읽기 처리 중 오류가 발생했어요.");
    }
  };

  const handleDeleteAlarms = async () => {
    try {
      if (selectedIds.length === 0) return;
      await deleteSelectedAlarms(selectedIds); // ✅ API 호출
      alert("선택한 알림을 삭제 처리했어요.");
      setOnCheck(false);
      setSelectedIds([]);
      await fetchAlarms();
    } catch (error) {
      console.error("📛 삭제 처리 중 오류:", error);
      alert("삭제 처리 중 오류가 발생했어요.");
    }
  };

  return (
    <Suspense>
      <div className="space-y-4 pt-4 w-full">
        <div className="relative grid grid-cols-4 rounded-[999px] w-full bg-white p-3 px-1">
          <button
            className={`text-md z-30 font-[500] ${
              buttonSelected.buttonSelected === "Default"
                ? "text-white"
                : "text-[#2A2A2A]"
            }`}
            onClick={() => handleButtonSelect("Default")}
          >
            전체
          </button>
          <button
            className={`text-md z-30 font-[500] ${
              buttonSelected.buttonSelected === "InOut"
                ? "text-white"
                : "text-[#2A2A2A]"
            }`}
            onClick={() => handleButtonSelect("InOut")}
          >
            입/출차
          </button>
          <button
            className={`text-md z-30 font-[500] ${
              buttonSelected.buttonSelected === "RESERVE"
                ? "text-white"
                : "text-[#2A2A2A]"
            }`}
            onClick={() => handleButtonSelect("RESERVE")}
          >
            예약
          </button>
          <button
            className={`text-md z-30 font-[500] ${
              buttonSelected.buttonSelected === "Payment"
                ? "text-white"
                : "text-[#2A2A2A]"
            }`}
            onClick={() => handleButtonSelect("Payment")}
          >
            결제
          </button>
          <div
            className={`absolute bg-[#2A2A2A] rounded-[999px] w-[25%] h-[90%] top-1/2 -translate-y-1/2 z-10 transform-all duration-300 ${backgroundClass}`}
          ></div>
        </div>
        {!onCheck ? (
          <div className="flex items-center justify-end px-2 gap-2">
            <button
              className="font-[600] px-4 rounded-[10px] py-1 text-[#2a2a2a]"
              onClick={() => setOnCheck(true)}
            >
              선택
            </button>
            <button className="font-[600] bg-[#f0f0f0] px-4 rounded-[10px] py-1 text-[#2a2a2a]">
              읽기
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-2 gap-2">
            <div className="flex items-center gap-2 pl-2">
              <input
                type="checkbox"
                id="selectAll"
                checked={
                  selectedIds.length === message.alarms.length &&
                  message.alarms.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(message.alarms.map((alarm) => alarm.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
              <label
                htmlFor="selectAll"
                className="font-[500] text-[#2a2a2a] cursor-pointer"
              >
                전체 선택
              </label>
            </div>
            <div className="flex items-center gap-2">
              {/* ✅ 조건부: 선택된 항목이 있을 때만 보이게 */}
              {selectedIds.length > 0 && (
                <>
                  <button
                    className="font-[600] bg-[#2a2a2a] px-4 rounded-[10px] py-1 text-white"
                    onClick={handleDeleteAlarms}
                  >
                    삭제
                  </button>
                  <button
                    className="font-[600] bg-[#f0f0f0] px-4 rounded-[10px] py-1 text-[#2a2a2a]"
                    onClick={handleReadAlarms}
                  >
                    읽기
                  </button>
                </>
              )}

              {/* ✅ 항상 보이는 취소 버튼 */}
              <button
                className="font-[600] bg-[#fff] px-4 rounded-[10px] py-1 text-[#2a2a2a]"
                onClick={handleCancel}
              >
                취소
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3 w-full">
          {message.alarms.map((alarm) => (
            <NoticeComponent
              key={alarm.id}
              title={
                alarm.alarmType === "INOUT"
                  ? "입/출차 알림"
                  : alarm.alarmType === "RESERVE"
                  ? "예약 알림"
                  : "결제 알림"
              }
              message={alarm.content}
              date={alarm.createdAt.split("T")[0]}
              isRead={alarm.isRead}
              onChecked={onCheck}
              checked={selectedIds.includes(alarm.id)}
              onChange={() => {
                setSelectedIds(
                  (prev) =>
                    prev.includes(alarm.id)
                      ? prev.filter((id) => id !== alarm.id) // 체크 해제
                      : [...prev, alarm.id] // 체크 추가
                );
              }}
            />
          ))}
        </div>
        <PageButton pagination={message.pagination} />
      </div>
    </Suspense>
  );
}
