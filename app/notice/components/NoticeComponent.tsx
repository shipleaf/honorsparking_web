import React from "react";

interface noticeProps {
  title: string;
  message: string;
  date: string;
  isRead: string;
  onChecked: boolean;
  checked?: boolean;
  onChange?: () => void;
}

export default function NoticeComponent({
  title,
  message,
  date,
  isRead,
  onChecked,
  checked,
  onChange,
}: noticeProps) {
  return (
    <div
      className={`rounded-[1rem] p-4 flex gap-4 w-full
      ${isRead == "READ" ? "bg-[#fff]" : "bg-[#f0f0f0]"}
    `}
    >
      {onChecked ? (
        <div
          className={`
      flex items-center justify-center 
      transition-all duration-300 ease-out
      translate-x-0 opacity-100
    `}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="transform scale-100 transition-transform duration-300 ease-in-out"
          />
        </div>
      ) : (
        <div
          className={`w-0 opacity-0 -translate-x-3 transition-all duration-300 ease-out`}
        />
      )}
      <div
        className={`
          content flex flex-col gap-1 w-full
          transition-all duration-[3000] ease-out
        `}
      >
        <div className="flex items-center justify-between">
          <span className="text-[#2A2A2A] font-[700] text-[17px]">{title}</span>
          <span className="text-[#C5C8CB] font-[400] text-[13px]">{date}</span>
        </div>
        <span className="font-[400] text-[1rem] text-[#7E7F83]">{message}</span>
      </div>
    </div>
  );
}
