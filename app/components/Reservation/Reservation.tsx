"use client";

import React, { useEffect, useState } from "react";
import ReservationHeader from "./ReservationHeader";
import ReservationComponents from "./ReservationComponent";
import { ParkingZone } from "@/app/reservation/components/ReservationList";
import { fetchParkingZoneList } from "@/app/api/ParkingZoneAPI";

export default function Reservation() {
  const [parkingZones, setParkingZones] = useState<ParkingZone[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchParkingZoneList();
        setParkingZones(res.parkingZones);
      } catch (err) {
        console.error("주차장 목록 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

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
