"use client";

import { useEffect, useState } from "react";
import { useGuestStore } from "@/store/guestStore";
import { fetchNonMemberParking } from "../api/GuestAPI";
import { useQuery } from "@tanstack/react-query";
import { NonMemberParkingEntry } from "../api/GuestAPI";

export default function Page() {
  const { carNumber } = useGuestStore();
  const [showModal, setShowModal] = useState(false);

  const { data, isError, isLoading, isFetched } = useQuery({
    queryKey: ["nonMemberParking", carNumber],
    queryFn: () => fetchNonMemberParking(carNumber),
    retry: false,
    enabled: !!carNumber,
  });

  useEffect(() => {
    if (isFetched && (isError || data?.parkingEntries.length === 0)) {
      setShowModal(true);
    }
  }, [isFetched, isError, data]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-[#fff]">
        <span className="loader !w-[48px] !bg-[#2221d0]"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">비회원 주차 조회</h2>

      {data?.parkingEntries.map((entry: NonMemberParkingEntry) => (
        <div key={entry.vehicleNumber} className="mt-4 p-4 border rounded">
          <p>차량번호: {entry.vehicleNumber}</p>
          <p>위치: {entry.parkingLotLocation}</p>
          <p>입차: {new Date(entry.entryTime).toLocaleString()}</p>
          <p>요금: {entry.currentFee.toLocaleString()}원</p>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[80%] max-w-sm text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">알림</h3>
            <p className="text-sm text-gray-700 mb-6">주차 중이 아닙니다.</p>
            <button
              className="bg-[#093AEE] text-white px-4 py-2 rounded-full"
              onClick={() => setShowModal(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
