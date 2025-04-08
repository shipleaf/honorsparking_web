"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { TbCurrentLocation } from "react-icons/tb";
import FooterNav from "@/app/common/FooterNav";
import SideBar from "@/app/common/SideBar";
import ReservationList from "./components/ReservationList";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/store/locationStore";
import { fetchParkingZoneList } from "@/app/api/ParkingZoneAPI";

export default function Page() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleSideBar = () => setIsSideBarOpen(true);
  const closeSideBar = () => setIsSideBarOpen(false);

  const location = useLocationStore((state) => state.location);

  const {
    data,
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

  const handleLocationClick = () => {
    setIsLoading(true);
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "GET_LOCATION" })
    );
  };

  useEffect(() => {
    const handleUserLocation = (e: CustomEvent) => {
      const newLocation = e.detail;
      if (newLocation?.latitude && newLocation?.longitude) {
        useLocationStore.getState().setLocation(newLocation);
      }
      setIsLoading(false);
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

  const parkingZones = data?.parkingZones ?? [];

  return (
    <div className="bg-[#f0f0f0] flex flex-col w-full pb-[12vh] min-h-[100vh]">
      {/* Header */}
      <div className="relative w-full">
        <div className="grid grid-cols-5 items-center p-6 w-full">
          <button className="justify-self-start pl-2" onClick={toggleSideBar}>
            <Image src="/src/icon/SideBar.svg" alt="" width={24} height={24} />
          </button>
          <span className="font-[700] text-center col-span-3">주차장 예약</span>
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

        {/* 사이드바 */}
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

      {/* 검색 바 + 리스트 */}
      <div className="px-6 w-full">
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
            // onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="font-[700] text-lg mt-8 mb-6">
          {isFocused ? "검색 결과" : "예약 가능한 주차장"}
        </div>

        <ReservationList
          parkingZones={parkingZones}
          isLoading={isQueryLoading || !location}
          isFetching={isFetching}
          isError={isError}
        />
      </div>

      <FooterNav currentpage="parking" />
    </div>
  );
}
