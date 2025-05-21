// store/locationStore.ts
import { create } from "zustand";
import { ParkingZone } from "@/app/reservation/components/ReservationList";

interface LocationState {
  location: { latitude: number; longitude: number } | null;
  parkingZones: ParkingZone[];
  setLocation: (loc: { latitude: number; longitude: number }) => void;
  setParkingZones: (zones: ParkingZone[]) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  parkingZones: [],
  setLocation: (loc) => set({ location: loc }),
  setParkingZones: (zones) => set({ parkingZones: zones }),
}));
