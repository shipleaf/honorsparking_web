"use client";

import React, { useEffect } from "react";
import ReservationHeader from "./ReservationHeader";
import ReservationComponents from "./ReservationComponent";
import { ParkingZone } from "@/app/reservation/components/ReservationList";
import { fetchParkingZoneList } from "@/app/api/ParkingZoneAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SkeletonCard from "./SkeletonCard";
import { useLocationStore } from "@/store/locationStore";

export default function Reservation() {
  const location = useLocationStore((state) => state.location);

  const queryClient = useQueryClient();

  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "GET_LOCATION" })
    );
    console.log("📡 위치 요청 (초기 마운트)");
  }, []);

  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    const handleLocation = (
      event: CustomEvent<{ latitude: number; longitude: number }>
    ) => {
      const { latitude, longitude } = event.detail;
      console.log("📍 위치 도착!", latitude, longitude);
      setLocation({ latitude, longitude });

      queryClient.invalidateQueries({ queryKey: ["parkingZoneInfo"] });
    };

    const listener = (e: Event) => handleLocation(e as CustomEvent);
    window.addEventListener("userLocation", listener);
    return () => {
      window.removeEventListener("userLocation", listener);
    };
  }, [queryClient, setLocation]);

  // 쿼리
  const { data, isLoading, isError } = useQuery({
    queryKey: ["parkingZoneInfo", location],
    queryFn: () => {
      if (!location) throw new Error("위치 정보가 없습니다");
      return fetchParkingZoneList(location);
    },
    enabled: !!location,
    retry: false,
  });

  const parkingZones: ParkingZone[] = data?.parkingZones ?? [];

  return (
    <div className="px-6 flex flex-col w-full gap-4">
      <ReservationHeader />
      {(isLoading || !location) && (
        <div className="flex flex-row overflow-x-auto w-full gap-2 scrollbar-hide">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {isError && <div>데이터를 불러오는 중 오류가 발생했습니다.</div>}

      {!isLoading && location && parkingZones.length > 0 && (
        <div className="flex flex-row overflow-x-auto w-full gap-2 scrollbar-hide">
          {parkingZones.slice(0, 3).map((zone, idx) => (
            <div key={idx} className="flex flex-shrink-0">
              <ReservationComponents data={zone} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}