"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface PageHeaderProps {
  title: string;
  backButton?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  backButton,
  onBack,
  rightElement,
  className = "",
}: PageHeaderProps) {
  const router = useRouter();
  const showBack = backButton || !!onBack;
  const handleBack = onBack ?? (() => router.back());

  return (
    <div
      className={`relative w-full flex items-center justify-center p-6 ${className}`}
    >
      {showBack && (
        <button onClick={handleBack} aria-label="뒤로가기">
          <MdKeyboardArrowLeft
            className="absolute left-6 top-6"
            size={24}
            color="#2A2A2A"
          />
        </button>
      )}
      <span className="font-bold text-h7">{title}</span>
      {rightElement && (
        <div className="absolute right-6 top-6">{rightElement}</div>
      )}
    </div>
  );
}
