"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuSquareArrowLeft, LuSquareArrowRight } from "react-icons/lu";

export interface Pagination {
  totalPages: number;
  pageSize: number;
  totalItems: number;
  currentPage: number;
}

interface PageButtonProps {
  pagination: Pagination;
}

export default function PageButton({ pagination }: PageButtonProps) {
  const { totalPages, currentPage } = pagination;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`/notice?${params.toString()}`);
  };

  // 현재 그룹 시작과 끝 계산 (5개 단위)
  const groupStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const groupEnd = Math.min(groupStart + 4, totalPages);

  const hasPrevGroup = groupStart > 1;
  const hasNextGroup = groupEnd < totalPages;

  return (
    <div className="flex gap-2 justify-center pt-4 pb-36">
      {/* 이전 그룹으로 */}
      <button
        onClick={() => hasPrevGroup && handleClick(Math.max(1, groupStart - 5))}
        disabled={!hasPrevGroup}
      >
        <LuSquareArrowLeft
          size={32}
          color={hasPrevGroup ? "#7e7f83" : "#f0f0f0"}
        />
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => {
        const page = groupStart + i;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: isActive ? "#f0f0f0" : "white",
              color: "#2a2a2a",
              cursor: "pointer",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        );
      })}

      {/* 다음 그룹으로 */}
      <button
        onClick={() =>
          hasNextGroup && handleClick(Math.min(totalPages, groupStart + 5))
        }
        disabled={!hasNextGroup}
      >
        <LuSquareArrowRight
          size={32}
          color={hasNextGroup ? "#7e7f83" : "#f0f0f0"}
        />
      </button>
    </div>
  );
}