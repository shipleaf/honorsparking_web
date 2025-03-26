"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ParkingZone } from "./ReservationList";

interface Props {
  data: ParkingZone;
}

type FeeRule = {
  ruleName: string;
  startTime: number;
  endTime: number | null;
  costPerTimeSlot: number;
  costTimeSlot: number;
};

export default function NaverMapComponent({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(data.latitude, data.longitude),
        zoom: 18,
      };

      new naver.maps.Map("map", mapOptions);
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement("script");
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
      document.head.appendChild(mapScript);
    }
    // eslint-disable-next-line
  }, []);

  const formatFeeRules = (rules: FeeRule[]): string[] => {
    if (!rules || rules.length === 0) return ["요금 정보 없음"];
  
    const sorted = [...rules].sort((a, b) => a.startTime - b.startTime);
    const MAX_TIME = 2147483647;
  
    return sorted.map((rule, index) => {
      const durationMinutes = (rule.endTime ?? MAX_TIME) - rule.startTime + 1;
  
      const formattedTime = durationMinutes >= 60
        ? `${Math.floor(durationMinutes / 60)}시간${durationMinutes % 60 ? ` ${durationMinutes % 60}분` : ""}`
        : `${durationMinutes}분`;
  
      const cost = rule.costPerTimeSlot.toLocaleString(); // 2000 → "2,000"
  
      if (index === 0) {
        // 최초 요금
        return rule.costTimeSlot === durationMinutes
          ? `최초 ${formattedTime} ${cost}원`
          : `최초 ${formattedTime} ${rule.costTimeSlot}분당 ${cost}원`;
      } else if (rule.endTime === null || rule.endTime === MAX_TIME) {
        return `이후 ${rule.costTimeSlot}분당 ${cost}원`;
      } else {
        const rangeMinutes = rule.endTime - rule.startTime + 1;
        const rangeStr = rangeMinutes >= 60
          ? `${Math.floor(rangeMinutes / 60)}시간${rangeMinutes % 60 ? ` ${rangeMinutes % 60}분` : ""}`
          : `${rangeMinutes}분`;
  
        return `이후 ${rangeStr} ${rule.costTimeSlot}분당 ${cost}원`;
      }
    });
  };

  const ruleText = formatFeeRules(data.parkingFeeRules);

  return (
    <div className="relative">
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      <div className="fixed bottom-0 w-full bg-white rounded-t-[1.25rem] p-4 flex flex-col justify-center gap-2">
        <div className="w-full flex items-center justify-center p-2">
          <Image src="/src/icon/Grabber.svg" alt="" width={36} height={24} />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-3 w-[90%]">
            <Image
              src={data?.thumbnail}
              alt=""
              width={48}
              height={48}
              className="w-[20%]"
            />
            <div className="flex flex-col items-start justify-center w-[80%]">
              <span className="font-[700] w-[90%] truncate overflow-hidden whitespace-nowrap">
                {data?.zoneName}
              </span>
              <span className="text-[#7E7F83] font-[500]">
                {data?.cityName} {data?.districtName} {data?.eupMyeonDongName}
              </span>
            </div>
          </div>
          <button className="w-[10%] flex-shrink-0">
            {data.isFavorite ? (
              <Image
                src="/src/icon/OnBookMark.svg"
                alt=""
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/src/icon/BookMark.svg"
                alt=""
                width={30}
                height={30}
              />
            )}
          </button>
        </div>
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="bg-[#F7F7F7] rounded-[16px] p-3 flex flex-col gap-5">
            <div className="flex flex-row items-center justify-start">
              <Image
                src="/src/icon/Parking.svg"
                alt=""
                width={30}
                height={30}
              />
              <span className="text-[#4C4D4F] font-[500]">주차공간</span>
            </div>
            <span className="text-xl font-[700] pl-3 pb-2">{data?.size}개</span>
          </div>
          <div className="bg-[#F7F7F7] rounded-[16px] p-3 flex flex-col gap-5">
            <div className="flex flex-row items-center justify-start">
              <Image
                src="/src/icon/ElectCar.svg"
                alt=""
                width={30}
                height={30}
              />
              <span className="text-[#4C4D4F] font-[500]">전기차</span>
            </div>
            <span className="text-xl font-[700] pl-3 pb-2">
              {data?.electricCarSpaceCount}개
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center justify-start pl-2 py-4">
          <span className="text-[#2A2A2A] font-[700] text-lg">주차요금</span>
          <Image
            src="/src/icon/Information.svg"
            alt=""
            width={24}
            height={24}
            onClick={() => setIsFeeModalOpen(true)}
          />
        </div>
        <button
          className="rounded-[999px] bg-[#093AEE] p-3 text-white font-[400]"
          onClick={(e) => {
            e.stopPropagation();
            handleModalOpen();
          }}
        >
          예약하기
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="bg-white p-6 rounded-[16px] w-[90%] max-w-md">
            <h2 className="text-[17px] font-[700] mb-4">
              정말 예약하시겠습니까?
            </h2>
            <div className="bg-[#F7F7F7] rounded-[10px] p-4 space-y-4">
              <span className="text-[#093AEE] font-[700] text-md">
                {data?.zoneName}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-[500] text-[#7E7F83]">
                    시간당
                  </span>
                  <span className="font-[700] text-[#2a2a2a] text-md">
                    500원
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-[500] text-[#7E7F83]">
                    입차 시작 시간
                  </span>
                  <span className="font-[700] text-[#2a2a2a] text-md">
                    오후 6시 10분
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 mt-6">
              <button
                className="rounded-[999px] bg-white p-4 px-12 font-[500] text-md text-[#2a2a2a]"
                onClick={handleModalClose}
              >
                취소
              </button>
              <button
                className="rounded-[999px] bg-[#093AEE] p-4 px-12 text-white font-[500]"
                onClick={() => {
                  alert("예약되었습니다!");
                  handleModalClose();
                }}
              >
                예약하기
              </button>
            </div>
          </div>
        </div>
      )}
      {isFeeModalOpen ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="bg-white p-6 rounded-[16px] w-[90%] max-w-md">
            <h2 className="text-[17px] font-[700] mb-4">주차요금</h2>
            <div className="bg-[#F7F7F7] rounded-[10px] p-4 space-y-2">
              {ruleText.map((line: string, index: number) => (
                <p key={index} className="text-[#093AEE] font-[700] text-md">
                  {line}
                </p>
              ))}
            </div>
            <div className="w-full mt-6">
              <button
                className="rounded-[999px] bg-[#093AEE] p-4 px-12 w-full text-white font-[500]"
                onClick={() => setIsFeeModalOpen(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
