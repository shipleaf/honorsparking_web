import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export type ParkingZoneResponse = {
  meta: {
    keyword: string;
    isEnd: boolean;
    pagination: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalItems: number;
    };
  };
  parkingZones: ParkingZone[];
};

type ParkingZone = {
  matchedInfo: MatchedInfo[];
  isFavorite: boolean;
  latitude: number;
  longitude: number;
  zoneName: string;
  cityName: string;
  districtName: string;
  eupMyeonDongName: string;
  address: string;
  electricCarSpaceCount: number | null;
  size: number;
  maxCost: number | null;
  parkingFeeRules: ParkingFeeRule[];
  thumbnail: string;
};

type MatchedInfo = {
  field: string;
  value: string;
  matchedText: string;
  startIndex: number;
  endIndex: number;
};

type ParkingFeeRule = {
  ruleName: string;
  startTime: number;
  endTime: number;
  costPerTimeSlot: number;
  costTimeSlot: number;
};

// 여기까지 주차장 검색

// 여기부터 지역 검색

type LocalZoneMeta = {
  keyword: string;
  isEnd: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    pagePerItem: number;
    totalItems: number;
  };
};

type LocalZoneDocument = {
  placeName: string;
  distance: string;
  categoryName: string;
  addressName: string;
  roadAddressName: string;
  phone: string;
  y: string;
  x: string;
};

export type LocalParkingZone = {
  meta: LocalZoneMeta;
  documents: LocalZoneDocument[];
};

export const fetchParkingZoneList = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const response = await axios.get(
    `${apiUrl}/api/v1/parkingzone/list?latitude=${latitude}&longitude=${longitude}`,
    {
      withCredentials: true,
    }
  );

  console.log("주차장 불러오기 성공", response.data);
  return response.data;
};

export const fetchParkingZoneHistory = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/parking/history`, {
      withCredentials: true,
    });

    console.log("주차장 사용내역 불러오기 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("주차장 사용내역 불러오기 실패", error);
    throw error;
  }
};

export const searchParkingZone = async (
  keyword: string
): Promise<ParkingZoneResponse> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/search/parking?keyword=${keyword}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchLocalZone = async ({
  keyword,
  latitude,
  longitude,
}: {
  keyword: string;
  latitude: number;
  longitude: number;
}): Promise<LocalParkingZone> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/search/local?keyword=${keyword}&latitudeY=${latitude}&longitudeX=${longitude}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
