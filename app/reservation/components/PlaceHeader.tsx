"use client";

import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface Props {
  setIsDetailPageOpen: (open: boolean) => void;
  zoneName: string;
}

export default function PlaceHeader({ setIsDetailPageOpen, zoneName }: Props) {
  return (
    <div className="w-full flex items-center justify-center p-6">
      <button
        onClick={() => {
          setIsDetailPageOpen(false);
        }}
      >
        <MdKeyboardArrowLeft
          className="absolute left-6 top-6"
          size={24}
          color="#2A2A2A"
        />
      </button>
      <span className="font-[700] text-[17px]">{zoneName}</span>
    </div>
  );
}
