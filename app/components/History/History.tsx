"use client";

import React from "react";
// import { useEffect, useState } from "react";
import HistoryHeader from "./HistoryHeader";
// import HistoryComponents from "./HistoryComponents";
// import { fetchParkingZoneHistory } from "@/app/api/ParkingZoneAPI";

export interface ParkingHistory {
  id: number;
  zoneName: string;
  entranceTime: string;
  exitTime: string;
  payAmount: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface ParkingHistoryResponse {
  parkingHistories: ParkingHistory[];
  pagination: Pagination;
  startTime: string;
  endTime: string;
}

export default function History() {
  // const [parkingHistory, setParkingHistory] = useState<ParkingHistory[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetchParkingZoneHistory();
  //       setParkingHistory(res.parkingHistories); // ✅ 올바른 데이터 키
  //     } catch (err) {
  //       console.error("주차 기록 불러오기 실패:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="w-full p-6 flex flex-col gap-4">
      <HistoryHeader />
      {/* {parkingHistory.map((history) => (
        <HistoryComponents key={history.id} data={history} />
      ))} */}
    </div>
  );
}