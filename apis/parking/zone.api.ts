import apiClient from "../apiClient";
import { LocalParkingZone, ParkingZoneResponse } from "./zone.type";

export const fetchParkingZoneList = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const response = await apiClient.get(
    '/parkingzone/list',
    {
      params: {
        latitude,
        longitude,
      }
    }
  );
  return response.data;
};

export const fetchParkingZoneHistory = async () => {
    const response = await apiClient.get(`/parking/history`);
    return response.data;
};

export const searchParkingZone = async ( keyword: string ): Promise<ParkingZoneResponse> => {
    const response = await apiClient.get('search/parking', { params:  { keyword } });
    return response.data;
};

export const searchLocalZone = async ({
  keyword,
  latitude,
  longitude,
}: {
  keyword: string;
  latitude: number;
  longitude: number;
}): Promise<LocalParkingZone> => {
    const response = await apiClient.get('/search/local',{
        params: {
          keyword,
          latitude,
          longitude
        }
      }
    );
    return response.data;
};
