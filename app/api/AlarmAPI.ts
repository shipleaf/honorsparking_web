// import axios from "axios";
import apiClient from "./axiosWithCsrf";

export const readSelectedAlarms = async (alarmIDList: number[]) => {
  try {
    const response = await apiClient.put(
      // const response = await axios.put(
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
    const response = await apiClient.delete(`/api/v1/alarm`, {
      // const response = await axios.delete(`/api/v1/alarm`, {
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
