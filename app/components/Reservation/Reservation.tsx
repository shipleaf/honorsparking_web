"use client";

import React from "react";
import ReservationHeader from "./ReservationHeader";
import ReservationComponents from "./ReservationComponent";
import { ParkingZone } from "@/app/reservation/components/ReservationList";
import { fetchParkingZoneList } from "@/app/api/ParkingZoneAPI";
import { useQuery } from "@tanstack/react-query";

export default function Reservation() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["parkingZoneInfo"],
    queryFn: fetchParkingZoneList,
    retry: false,
  });

  const parkingZones: ParkingZone[] = data?.parkingZones ?? [];

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="px-6 flex flex-col w-full gap-4">
      <ReservationHeader />
      <div className="flex flex-row overflow-x-auto w-full gap-2 scrollbar-hide">
        {parkingZones.slice(0, 3).map((zone, idx) => (
          <div key={idx} className="flex flex-shrink-0">
            <ReservationComponents data={zone} />
          </div>
        ))}
      </div>
    </div>
  );
}