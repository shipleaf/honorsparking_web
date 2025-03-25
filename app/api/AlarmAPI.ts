import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export const readSelectedAlarms = async (alarmIDList: number[]) => {
  try {
    const response = await axios.put(
      `${apiUrl}/api/v1/alarm`,
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
    const response = await axios.delete(`${apiUrl}/api/v1/alarm`, {
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