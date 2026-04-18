"use client";

import React, { useEffect } from "react";
import ReservationDetailComponents from "./ReservationDetailComponent";
import ReservationDetailSkeleton from "./ReservationDetailSkeleton";

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

interface Props {
  parkingZones: ParkingZone[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

export default function ReservationList({
  parkingZones,
  isLoading,
  isFetching,
  isError,
}: Props) {
  const shouldShowSkeleton = isLoading || isFetching;

  useEffect(() => {
    if (!shouldShowSkeleton && parkingZones.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [shouldShowSkeleton, parkingZones]);

  if (shouldShowSkeleton) {
    return (
      <div className="flex flex-col gap-4 items-center">
        {Array.from({ length: 3 }).map((_, idx) => (
          <ReservationDetailSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold">
        주차장이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {parkingZones.map((zone, idx) => (
        <ReservationDetailComponents key={idx} data={zone} />
      ))}
    </div>
  );
}
