import apiClient from "../apiClient";
import { GetNonMemberParkingResponse } from "./guest.type";

export const fetchNonMemberParking = async (vehicleNumber: string) => {
  const response = await apiClient.get<GetNonMemberParkingResponse>('/parking/nonmember', {params: { vehicleNumber }});
  return response.data;
};
