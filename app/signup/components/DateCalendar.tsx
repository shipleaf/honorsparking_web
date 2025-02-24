import React from "react";
import dayjs from "dayjs";
dayjs.locale("ko");

export default function DateCalendar() {
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const pastYear = currentDate.subtract(200, "year").year();

  const years = [];
  for (let year = currentYear; year >= pastYear; year--) {
    years.push(String(year));
  }

  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>{dayOfTheWeek}</div>
  )
};