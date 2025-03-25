import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

// 위, 경도값이 필수

export const fetchParkingZoneList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/parkingzone/list`, {
      withCredentials: true,
    });

    console.log("주차장 불러오기 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("주차장 불러오기 실패", error);
    throw error;
  }
};