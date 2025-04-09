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
  const setLocation = useLocationStore((state) => state.setLocation);

  const isApp =
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("Honors-WebView");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isApp) {
      // ✅ 앱(WebView) 접속
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: "GET_LOCATION" })
      );
      console.log("📡 앱에 위치 요청");
    } else {
      // 🌐 웹 브라우저 접속
      if (navigator.geolocation) {
        const timer = setTimeout(() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log("🌍 웹 위치 수신:", latitude, longitude);
              setLocation({ latitude, longitude });
              queryClient.invalidateQueries({ queryKey: ["parkingZoneInfo"] });
            },
            (error) => {
              console.error(
                "❌ 위치 가져오기 실패:",
                error.message,
                `(code: ${error.code})`
              );

              // 필요하다면 여기서 사용자에게 위치 권한 안내 문구 표시 가능
              // 예: PERMISSION_DENIED일 때 "위치 권한을 허용해주세요" 같은 안내
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 10000, // ✅ 캐시 허용 → 실패 확률 감소
            }
          );
        }, 300); // ✅ 위치 시스템 안정화 시간 확보

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 정리
      } else {
        console.warn("❌ 이 브라우저는 위치 기능을 지원하지 않습니다.");
      }
    }
  }, [isApp, queryClient, setLocation]);

  // 앱에서 받은 위치 이벤트 수신
  useEffect(() => {
    const handleLocation = (
      event: CustomEvent<{ latitude: number; longitude: number }>
    ) => {
      const { latitude, longitude } = event.detail;
      console.log("📍 위치 도착 (앱)!", latitude, longitude);
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
