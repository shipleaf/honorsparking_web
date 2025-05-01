import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export const fetchMyName = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/mypage/username`, {
    withCredentials: true,
  });
  return response.data;
};
