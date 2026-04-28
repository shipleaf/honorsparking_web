import apiClient from "../apiClient";

export const fetchMyStatus = async () => {
  const response = await apiClient.get('/parking/me');
  return response.data;
};

export const fetchSessionInfo = async () => {
  const response = await apiClient.get('/session/info');
  return response.data;
};

export const checkPassword = async (password: string) => {
  const response = await apiClient.post('/mypage/info/password/check', { password });
  return response.data;
};

export const updateUserRole = async () => {
  const response = await apiClient.put('/mypage/role/user');
  return response.data;
};
