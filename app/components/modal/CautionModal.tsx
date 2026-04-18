import React from "react";

interface CautionModalProps {
  title: string;
  body: string | null;
  onClose: () => void;
}

export default function CautionModal({
  title,
  body,
  onClose,
}: CautionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-8 max-w-[90%] w-[360px] shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{body}</p>
        <div className="flex w-full items-center gap-2 justify-center">
          <button
            onClick={onClose}
            className="bg-[#093AEE] text-white p-4 rounded-[999px] w-full font-[500]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
