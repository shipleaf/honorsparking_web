import axios from "axios";
// import apiClient from "./axiosWithCsrf";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export const fetchMyStatus = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/parking/me`, {
    withCredentials: true,
  });

  console.log("현재 상태 불러오기 성공", response.data);
  return response.data;
};

export const fetchSessionInfo = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/session/info`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return res.data;
};

export const checkPassword = async (password: string) => {
  const response = await axios.post(
    `${apiUrl}/api/v1/mypage/info/password/check`,
    { password },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateUserRole = async () => {
  const response = await axios.put(
    `${apiUrl}/api/v1/mypage/role/user`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
