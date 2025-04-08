"use client";

import React, { useEffect, useState } from "react";
import ReservationHeader from "./ReservationHeader";
import ReservationComponents from "./ReservationComponent";
import { ParkingZone } from "@/app/reservation/components/ReservationList";
import { fetchParkingZoneList } from "@/app/api/ParkingZoneAPI";
import { useQuery } from "@tanstack/react-query";

export default function Reservation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const handleLocation = (
      event: CustomEvent<{ latitude: number; longitude: number }>
    ) => {
      const { latitude, longitude } = event.detail;
      console.log("위치 도착!", latitude, longitude);
      setLocation({ latitude, longitude }); // 위치 저장
    };

    const listener = (e: Event) => handleLocation(e as CustomEvent);

    window.addEventListener("userLocation", listener);
    return () => {
      window.removeEventListener("userLocation", listener);
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["parkingZoneInfo", location], // location이 queryKey에 들어가야 refetch 됨
    queryFn: () => {
      if (!location) throw new Error("위치 정보가 없습니다");
      return fetchParkingZoneList(location);
    },
    enabled: !!location, // location 있을 때만 실행
    retry: false,
  });

  const parkingZones: ParkingZone[] = data?.parkingZones ?? [];

  if (!location) return <div>위치 정보를 기다리는 중...</div>;
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