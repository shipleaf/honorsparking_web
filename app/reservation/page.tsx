"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { TbCurrentLocation } from "react-icons/tb";
import FooterNav from "@/app/common/FooterNav";
import SideBar from "@/app/common/SideBar";
import ReservationList from "./components/ReservationList";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/store/locationStore";
import {
  fetchParkingZoneList,
  LocalParkingZone,
  ParkingZoneResponse,
  searchLocalZone,
  searchParkingZone,
} from "@/app/api/ParkingZoneAPI";
import { useDebounce } from "@/hooks/useDebounce";

export default function Page() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [parkingResults, setParkingResults] =
    useState<ParkingZoneResponse | null>(null);

  const [localResults, setLocalResults] = useState<LocalParkingZone | null>(
    null
  );

  const debouncedQuery = useDebounce(query);

  const toggleSideBar = () => setIsSideBarOpen(true);
  const closeSideBar = () => setIsSideBarOpen(false);

  const location = useLocationStore((state) => state.location);
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState<null | {
    placeName: string;
    roadAddressName?: string;
  }>(null);

  const [selectedPlaceParkingZones, setSelectedPlaceParkingZones] = useState<
    ParkingZoneResponse["parkingZones"] | null
  >(null);

  const {
    data,
    // eslint-disable-next-line
    isLoading: isQueryLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["parkingZoneInfo", location],
    queryFn: () => {
      if (!location) throw new Error("위치 정보가 없습니다");
      return fetchParkingZoneList(location);
    },
    enabled: !!location,
    retry: false,
  });

  const fetchResults = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery || !location) return;

      try {
        const [parkingData, localData] = await Promise.all([
          searchParkingZone(searchQuery),
          searchLocalZone({
            keyword: searchQuery,
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        ]);
        setParkingResults(parkingData);
        setLocalResults(localData);
      } catch (error) {
        console.error("검색 실패:", error);
      }
    },
    [location]
  );

  useEffect(() => {
    fetchResults(debouncedQuery);
  }, [debouncedQuery, fetchResults]);

  const isApp =
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("Honors-WebView");

  const handleLocationClick = () => {
    setIsLoading(true);

    if (isApp) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: "GET_LOCATION" })
      );
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("🌍 웹 위치 수신:", latitude, longitude);

            setTimeout(() => {
              useLocationStore.getState().setLocation({ latitude, longitude });
              setIsLoading(false);
            }, 1000);
          },
          (error) => {
            console.error("❌ 위치 가져오기 실패:", error);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.warn("❌ 브라우저가 위치 정보를 지원하지 않습니다.");
        setIsLoading(false);
      }
    }
  };

  // ✅ 앱에서 위치 응답 처리
  useEffect(() => {
    const handleUserLocation = (e: CustomEvent) => {
      const newLocation = e.detail;
      if (newLocation?.latitude && newLocation?.longitude) {
        setTimeout(() => {
          useLocationStore.getState().setLocation(newLocation);
          setIsLoading(false);
        }, 300);
      } else {
        setIsLoading(false);
      }
    };

    window.addEventListener(
      "userLocation",
      handleUserLocation as EventListener
    );
    return () =>
      window.removeEventListener(
        "userLocation",
        handleUserLocation as EventListener
      );
  }, []);

  // ✅ location 없으면 자동 위치 요청 (초기 진입 or 새로고침 시)
  useEffect(() => {
    if (!location) {
      setIsLoading(true);

      const isApp =
        typeof navigator !== "undefined" &&
        navigator.userAgent.includes("Honors-WebView");

      if (isApp) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: "GET_LOCATION" })
        );
        console.log("📡 앱에서 위치 요청 (초기 진입)");
      } else {
        if (navigator.geolocation) {
          const timer = setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                console.log("🌍 웹 위치 수신:", latitude, longitude);
                useLocationStore
                  .getState()
                  .setLocation({ latitude, longitude });

                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              },
              (error) => {
                console.error("❌ 위치 가져오기 실패:", error);
                setIsLoading(false);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
            );
          }, 300);

          return () => clearTimeout(timer);
        } else {
          console.warn("❌ 브라우저가 위치 정보를 지원하지 않습니다.");
          setIsLoading(false);
        }
      }
    }
  }, [location]);

  const parkingZones = data?.parkingZones ?? [];

  // parkingZones 선택 로직
  const resolvedParkingZones = parkingResults?.parkingZones
    ? parkingResults.parkingZones
    : parkingZones;

  // eslint-disable-next-line
  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handlePlaceClick = async (doc: {
    placeName: string;
    roadAddressName?: string;
    y: string;
    x: string;
  }) => {
    try {
      setIsLoading(true);
      setSelectedPlaceInfo({
        placeName: doc.placeName,
        roadAddressName: doc.roadAddressName,
      });

      const data = await fetchParkingZoneList({
        latitude: Number(doc.y),
        longitude: Number(doc.x),
      });

      setSelectedPlaceParkingZones(data.parkingZones);
    } catch (err) {
      console.error("🔴 관련 장소 주차장 검색 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f0f0f0] flex flex-col w-full pb-[12vh] min-h-[100vh]">
      {/* Header */}
      <div className="relative w-full">
        <div className="grid grid-cols-5 items-center p-6 w-full">
          <button className="justify-self-start pl-2" onClick={toggleSideBar}>
            <Image src="/src/icon/SideBar.svg" alt="" width={24} height={24} />
          </button>
          <span className="font-[700] text-center col-span-3">주변 주차장</span>
          <div className="flex items-center justify-end">
            {isLoading ? (
              <div className="loader" />
            ) : (
              <button onClick={handleLocationClick}>
                <TbCurrentLocation size={20} />
              </button>
            )}
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
            isSideBarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } z-[1000]`}
          onClick={closeSideBar}
        >
          <div
            className={`fixed inset-0 top-0 left-0 shadow-lg transform transition-transform duration-300 w-[80vw] ${
              isSideBarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <SideBar />
          </div>
        </div>
      </div>

      <div className="px-6 w-full mb-6">
        <div
          className={`w-full flex flex-row bg-white py-4 px-3 rounded-[12px] items-center gap-1 ${
            isFocused ? "border border-1 border-[#093AEE]" : "border"
          }`}
        >
          <Image src="/src/icon/Search.svg" alt="" width={24} height={24} />
          <input
            className="focus:outline-none"
            placeholder="주소 또는 주차장 이름 검색"
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
          />
        </div>

        <div className="font-[700] text-lg mt-8 mb-2">
          {selectedPlaceInfo
            ? `"${selectedPlaceInfo.placeName}" 주변 주차장`
            : query
            ? "검색 주차장"
            : "주변 주차장"}
        </div>

        {query &&
          resolvedParkingZones.length === 0 &&
          !selectedPlaceParkingZones && (
            <div className="text-sm text-gray-500 mb-6 w-full text-center">
              해당 주차장이 없습니다.
            </div>
          )}

        <ReservationList
          parkingZones={selectedPlaceParkingZones ?? resolvedParkingZones}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
        />
      </div>

      {localResults && localResults.documents.length > 0 && (
        <div className="px-6">
          <h2 className="font-bold text-lg mb-4">관련 장소</h2>
          {localResults.documents.map((doc, index) => (
            <div
              key={index}
              onClick={() => handlePlaceClick(doc)}
              className="bg-white p-4 mb-3 shadow-sm rounded-[28px] flex justify-between cursor-pointer"
            >
              <div>
                <div className="text-[16px] font-semibold">{doc.placeName}</div>
                <div className="text-sm text-[#7E7F83]">
                  {doc.roadAddressName}
                </div>
                <div className="text-xs text-[#aaa]">{doc.categoryName}</div>
              </div>
              <div className="text-xs text-[#aaa]">
                {(Number(doc.distance) / 1000).toFixed(1)}km
              </div>
            </div>
          ))}
        </div>
      )}
      <FooterNav currentpage="parking" />
    </div>
  );
}
