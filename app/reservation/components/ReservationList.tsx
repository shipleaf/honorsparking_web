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
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const handleLocation = (
      event: CustomEvent<{ latitude: number; longitude: number }>
    ) => {
      const { latitude, longitude } = event.detail;
      console.log("ReservationList 위치 도착!", latitude, longitude);
      setLocation({ latitude, longitude });
    };

    const listener = (e: Event) => handleLocation(e as CustomEvent);
    window.addEventListener("userLocation", listener);
    return () => window.removeEventListener("userLocation", listener);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;
      try {
        const res = await fetchParkingZoneList(location);
        setParkingZones(res.parkingZones);
      } catch (err) {
        console.error("주차장 목록 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [location]);

  if (!location) return <div>위치 정보를 기다리는 중...</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      {parkingZones.map((zone, idx) => (
        <ReservationDetailComponents key={idx} data={zone} />
      ))}
    </div>
  );
}