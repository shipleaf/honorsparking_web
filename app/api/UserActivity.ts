import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export const fetchMyStatus = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/parking/me`, {
    withCredentials: true,
  });

  console.log("현재 상태 불러오기 성공", response.data);
  return response.data;
};
