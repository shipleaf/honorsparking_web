"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyStatus } from "../api/UserActivity";
import InParking from "./Activity/InParking";
import OutParking from "./Activity/OutParking";

export type ParkingStatusResponse =
  | {
      isParked: false;
      parkingZone: null;
      entranceTime: null;
      cost: 0;
      message: string;
    }
  | {
      parkingZone: ParkingZoneInfo;
    }
  | {
      message: string;
    };

export interface ParkingZoneInfo {
  zoneName: string;
  hourlyRate: number;
  entranceTime: string; // ISO string
  cost: number;
}

export default function UserStatus() {
  const { data } = useQuery<ParkingStatusResponse>({
    queryKey: ["myParkingStatus"],
    queryFn: fetchMyStatus,
    retry: false,
  });

  if (!data) return null;

  // ✅ 1. 아예 주차 기록 없음
  if (
    "message" in data &&
    data.message === "해당 사용자의 주차 기록이 없습니다."
  ) {
    return <OutParking />;
  }

  // ✅ 2. 주차 중이 아님
  if ("isParked" in data && data.isParked === false) {
    return <OutParking />;
  }

  // ✅ 3. 주차 중
  if ("parkingZone" in data && data.parkingZone !== null) {
    return <InParking data={data.parkingZone} />;
  }

  return null; // fallback
}
// const data = {
//   parkingZone: {
//     entranceTime: "2025-05-22T00:00:00",
//     cost: 2200,
//     zoneName: "Seoul Gangnam-gu Yeoksam-dong Parking Lot",
//     hourlyRate: 1000,
//   },
// };
