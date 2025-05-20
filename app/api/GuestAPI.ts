import axios from "axios";

export interface NonMemberParkingEntry {
  vehicleNumber: string; // 조회하려 한 비회원 차량번호
  parkingLotLocation: string; // 주차장 위치
  entryTime: string; // 입차 시간 (ISO 문자열)
  totalParkingMinutes: number; // 주차 시간 (분 단위)
  currentFee: number; // 주차 요금
  entryPhotoUrl: string; // 입차 사진 URL
}

export interface GetNonMemberParkingResponse {
  parkingEntries: NonMemberParkingEntry[];
}

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

export const fetchNonMemberParking = async (vehicleNumber: string) => {
  const response = await axios.get(`${apiUrl}/api/v1/parking/nonmember`, {
    params: { vehicleNumber },
  });
  return response.data;
};
