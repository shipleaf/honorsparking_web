"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading, isError } = useQuery<ParkingStatusResponse>({
    queryKey: ["myParkingStatus"],
    queryFn: fetchMyStatus,
    retry: false,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !data) return <div>상태를 불러올 수 없습니다.</div>;

  return <div>{data.isParked ? <InParking /> : <OutParking />}</div>;
}