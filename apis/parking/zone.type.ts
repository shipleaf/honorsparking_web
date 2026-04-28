export type ParkingZoneResponse = {
  meta: {
    keyword: string;
    isEnd: boolean;
    pagination: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalItems: number;
    };
  };
  parkingZones: ParkingZone[];
};

type ParkingZone = {
  matchedInfo: MatchedInfo[];
  isFavorite: boolean;
  latitude: number;
  longitude: number;
  zoneName: string;
  cityName: string;
  districtName: string;
  eupMyeonDongName: string;
  address: string;
  electricCarSpaceCount: number | null;
  size: number;
  maxCost: number | null;
  parkingFeeRules: ParkingFeeRule[];
  thumbnail: string;
};

type MatchedInfo = {
  field: string;
  value: string;
  matchedText: string;
  startIndex: number;
  endIndex: number;
};

type ParkingFeeRule = {
  ruleName: string;
  startTime: number;
  endTime: number;
  costPerTimeSlot: number;
  costTimeSlot: number;
};

type LocalZoneMeta = {
  keyword: string;
  isEnd: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    pagePerItem: number;
    totalItems: number;
  };
};

type LocalZoneDocument = {
  placeName: string;
  distance: string;
  categoryName: string;
  addressName: string;
  roadAddressName: string;
  phone: string;
  y: string;
  x: string;
};

export type LocalParkingZone = {
  meta: LocalZoneMeta;
  documents: LocalZoneDocument[];
};