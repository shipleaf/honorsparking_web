import apiClient from "../apiClient";

export const checkUnreadAlarm = async () => {
  const response = await apiClient.get('/api/v1/alarmUnread');
  return response.data;
};

export const readSelectedAlarms = async (alarmIDList: number[]) => {
  try {
    const response = await apiClient.put('/api/v1/alarm',{ alarmIDList });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSelectedAlarms = async (alarmIDList: number[]) => {
  try {
    const response = await apiClient.delete(`/api/v1/alarm`, { data: { alarmIDList } });
    return response.data;
  } catch (error) {
    throw error;
  }
};
