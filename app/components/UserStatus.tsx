"use client";

import React, { useEffect, useState } from "react";
import { fetchMyStatus } from "../api/UserActivity";
import InParking from "./Activity/InParking";
import OutParking from "./Activity/OutParking";

export interface ParkingZoneInfo {
  zoneName: string;
  hourlyRate: number;
  entranceTime: string; // ISO string
  cost: number;
}

export interface ParkingStatusResponse {
  isParked: boolean;
  parkingZone: ParkingZoneInfo | null;
  entranceTime: string | null;
  cost: number;
  message: string;
}

export default function UserStatus() {
  const [parkingStatus, setParkingStatus] =
    useState<ParkingStatusResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: ParkingStatusResponse = await fetchMyStatus();
        setParkingStatus(res);
      } catch (err) {
        console.error("주차장 상태 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return <div>{parkingStatus?.isParked ? <InParking /> : <OutParking />}</div>;
}
