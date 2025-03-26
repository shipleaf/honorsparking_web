import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

// 위, 경도값이 필수

export const fetchParkingZoneList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/parkingzone/list?latitude=36.5123132&longitude=39.8483223`, {
      withCredentials: true,
    });

    console.log("주차장 불러오기 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("주차장 불러오기 실패", error);
    throw error;
  }
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