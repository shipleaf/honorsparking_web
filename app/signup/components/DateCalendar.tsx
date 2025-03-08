import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
dayjs.locale("ko");
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useSignupStore } from "@/store/useSignupStore";

interface DateCalendarProps {
  birthDate: string; // YYYY-MM-DD 형식의 날짜 문자열
  setBirthDate: React.Dispatch<React.SetStateAction<string>>; // 날짜를 변경하는 함수
  isBottomSheet: boolean; // 모달 열림 상태
  setIsBottomSheet: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
}

export default function DateCalendar({
  birthDate,
  setBirthDate,
  isBottomSheet,
  setIsBottomSheet,
}: DateCalendarProps) {
  // eslint-disable-next-line
  const { setSignupData } = useSignupStore();
  // eslint-disable-next-line
  const [showYearModal, setShowYearModal] = useState(false);

  const currentDate = dayjs(); // 현재 날짜 불러옴
  const currentYear = currentDate.year(); // 현재 연도
  const pastYear = currentDate.subtract(200, "year").year();

  const years = []; // years 배열 생성, past ~ 현재까지 추가
  for (let year = currentYear; year >= pastYear; year--) {
    years.push(String(year));
  }

  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
  // eslint-disable-next-line
  const [today, setToday] = useState(dayjs()); // 오늘 날짜 관리

  const daysInMonth = today.daysInMonth(); // 이번달에 몇일까지?

  const firstDayOfMonth = dayjs(today).startOf("month").locale("ko"); // 이번달 1일은?

  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = dayjs(firstDayOfMonth).add(i - 1, "day");
    dates.push(date);
  }

  const emptyDates = new Array(firstDayOfMonth.day()).fill(null);

  const calendarData = [...emptyDates, ...dates];

  const onClickPastMonth = () => {
    setToday(dayjs(today).subtract(1, "month"));
  };

  const onClickNextMonth = () => {
    setToday(dayjs(today).add(1, "month"));
  };

  const onClickResetBtn = () => {
    setToday(dayjs());
    setBirthDate("");
  };

  const onClickChangeYear = (year: string) => {
    setToday(today.set("year", parseInt(year, 10)));
    showYearModalBtn();
  };

  // 날짜 선택(변경) (= input 값 변경)
  const onClickChangeDate = (date: Dayjs) => {
    setBirthDate(date.format("YYYY-MM-DD"));
    setIsBottomSheet(false);

    // Zustand 상태 업데이트 (birthyear & birthday)
    setSignupData({
      birthyear: date.format("YYYY"),
      birthday: date.format("MMDD"),
    });
  };

  // 연도 모달 on, off
  const showYearModalBtn = () => {
    setShowYearModal(!showYearModal);
  };

  // DateCalendar 모달 on, off
  const showDateCalendarModalBtn = () => {
    setIsBottomSheet(false);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="z-[200]">
        {/* 달력 모달과 연도 선택 모달이 둘 다 켜진 경우, 구분을 위해 달력 모달에 배경색을 입힌다. */}
        <div
          className={`w-full p-4 rounded-2xl shadow-xxx ${
            isBottomSheet && showYearModal ? "bg-[#f0f0f0]" : "bg-[#fff]"
          }`}
        >
          <section className="w-full">
            {/* 달력의 헤더 */}
            <header>
              <div className="relative flex flex-row justify-center items-center pb-[22px]">
                {/* 연도 선택 버튼 */}
                <div onClick={showYearModalBtn} className="cursor-pointer">
                  {today.format("YYYY년 M월")}
                </div>
                {/* 이전 달로 변경 */}
                <div className="absolute left-4">
                  <IoIosArrowBack onClick={onClickPastMonth} />
                </div>
                {/* 다음 달로 변경 */}
                <div className="absolute right-4">
                  <IoIosArrowForward onClick={onClickNextMonth} />
                </div>

                {/* 연도 변경 모달 */}
                {showYearModal && (
                  <section className="absolute top-8 z-[201] bg-[#fff] border-[1px] w-full h-[280px] p-4 rounded-lg shadow-xxx ">
                    <div className="flex flex-row justify-end pt-2">
                      <MdCancel
                        onClick={showYearModalBtn}
                        size={24}
                        color="#cccccc"
                      />
                    </div>
                    <ul className="w-full h-[200px] flex flex-row flex-wrap overflow-y-scroll scrollbar-hide">
                      {years.map((year, index) => (
                        <li
                          key={index}
                          onClick={() => onClickChangeYear(year)}
                          className={`w-[25%] h-[30px] flex flex-row justify-center items-center text-lg text-gray-600 rounded-full cursor-pointer
                        ${
                          year === today.format("YYYY")
                            ? "bg-black text-white"
                            : "hover:font-bold hover:bg-gray-200 hover:text-black "
                        }`}
                        >
                          {year}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              {/* 요일 */}
              <ul className="flex flex-row justify-around pb-2">
                {dayOfTheWeek.map((el, index) => (
                  <li key={index} className="cursor-default">
                    {el}
                  </li>
                ))}
              </ul>
            </header>

            {/* 날짜 표시 */}
            <main>
              <ul className="flex flex-row flex-wrap">
                {calendarData.map((date, index) => (
                  <li
                    key={index}
                    className="w-[14.28%] aspect-square flex flex-row "
                  >
                    {date !== null ? (
                      <div
                        onClick={() => onClickChangeDate(date)}
                        className={`cursor-pointer w-full flex flex-row justify-center items-center rounded-full ${
                          date.format("YYYY-MM-DD") === birthDate
                            ? "bg-black text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {date.format("D")}
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </main>
          </section>

          {/* 모달 하단 부분 */}
          <section className="flex flex-row justify-between items-center px-2">
            {/* 초기화 버튼 */}
            <button
              type="button"
              onClick={onClickResetBtn}
              className="text-blue-500 hover:underline"
            >
              초기화
            </button>
          </section>
        </div>
      </div>

      {/* DateCalendar 모달 바깥 부분 */}
      <div
        onClick={showDateCalendarModalBtn}
        className="fixed top-0 left-0 w-full h-full z-[199]"
      ></div>
    </div>
  );
}
