"use client";

import React, { useEffect, useState } from "react";
import { fetchParkingZoneHistory } from "@/apis/parking/ParkingZoneAPI";
import HistoryComponents from "@/app/components/History/HistoryComponents";
import { ParkingHistory } from "@/app/components/History/History";

export default function History() {
  const [parkingHistory, setParkingHistory] = useState<ParkingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchParkingZoneHistory();
        setParkingHistory(res.parkingHistories);
      } catch (err) {
        console.error("주차 기록 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (parkingHistory.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-center text-[#999] py-10">
          최근 사용 내역이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 flex flex-col gap-4">
      {parkingHistory.map((history) => (
        <HistoryComponents key={history.id} data={history} />
      ))}
    </div>
  );
}
