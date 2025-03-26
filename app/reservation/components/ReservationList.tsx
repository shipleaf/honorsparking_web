"use client";

import React, { useEffect, useState } from "react";
import ReservationDetailComponents from "./ReservationDetailComponent";
import { fetchParkingZoneList } from "@/app/api/ParkingZoneAPI";

export interface ParkingZone {
  isFavorite: boolean;
  latitude: number;
  longitude: number;
  zoneName: string;
  cityName: string;
  districtName: string;
  eupMyeonDongName: string;
  electricCarSpaceCount: number | null;
  isReservedOk: boolean | null;
  size: number;
  floor: number | null;
  maxCost: number | null;
  parkingFeeRules: {
    ruleName: string;
    startTime: number;
    endTime: number | null;
    costPerTimeSlot: number;
    costTimeSlot: number;
  }[];
  thumbnail: string;
}

export default function ReservationList() {
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
    <div className="flex flex-col items-center gap-4">
      {parkingZones.map((zone, idx) => (
        <ReservationDetailComponents key={idx} data={zone} />
      ))}
    </div>
  );
}