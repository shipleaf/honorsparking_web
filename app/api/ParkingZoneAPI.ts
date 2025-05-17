import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

// 위, 경도값이 필수

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

export const searchParkingZone = async (keyword: string) => {
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
}) => {
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
