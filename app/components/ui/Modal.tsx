"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  backdropClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  backdropClassName = "",
  contentClassName = "",
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={[
        "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",
        backdropClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClose}
    >
      <div
        className={[
          "bg-white p-6 rounded-[16px] w-[90%] max-w-md",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-h7 font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
