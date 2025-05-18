import axios from "axios";
// import apiClient from "./axiosWithCsrf";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export const checkUnreadAlarm = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/alarmUnread`, {
    withCredentials: true,
  });
  return response.data;
};

export const readSelectedAlarms = async (alarmIDList: number[]) => {
  try {
    // const response = await apiClient.put(
    const response = await axios.put(
      `api/v1/alarm`,
      { alarmIDList },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSelectedAlarms = async (alarmIDList: number[]) => {
  try {
    // const response = await apiClient.delete(`/api/v1/alarm`, {
    const response = await axios.delete(`/api/v1/alarm`, {
      data: { alarmIDList },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
