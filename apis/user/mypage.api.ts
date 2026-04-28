import apiClient from "../apiClient";

export const fetchMyName = async () => {
  const response = await apiClient.get('/api/v1/mypage/username');
  return response.data;
};

export const fetchMyInfo = async () => {
  const response = await apiClient.get('/api/v1/mypage/info');
  return response.data;
};

export const updateMyInfo = async (carNumber: string) => {
  const response = await apiClient.put('/api/v1/mypage/car',{ carNumber });
  return response.data;
};
