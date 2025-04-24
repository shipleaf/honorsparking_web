import { create } from "zustand";

export interface SignupState {
  platform: string;
  name: string;
  mobile: string;
  birthyear: string;
  birthday: string;
  carNumber: string;
  accountId: string;
  accountPassword: string;
  email: string;
  setSignupData: (data: Partial<SignupState>) => void;
}

interface SignupStageState {
  stage: number;
  nextStage: () => void;
  prevStage: () => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  platform: "NORMAL",
  mobile: "",
  name: "",
  birthyear: "2000",
  birthday: "0219",
  carNumber: "",
  accountId: "",
  accountPassword: "",
  email: "",
  setSignupData: (data) => {
    set((state) => ({ ...state, ...data }));
  },
}));

export const useSignupStageStore = create<SignupStageState>((set) => ({
  stage: 0,
  maxStage: 4,
  nextStage: () =>
    set((state) => {
      const newStage = state.stage + 1;
      console.log("➡️ Next Stage:", newStage); // ✅ 다음 단계로 변경될 때 로그 출력
      return { stage: newStage };
    }),
  prevStage: () =>
    set((state) => {
      const newStage = Math.max(0, state.stage - 1);
      console.log("⬅️ Previous Stage:", newStage); // ✅ 이전 단계로 변경될 때 로그 출력
      return { stage: newStage };
    }),
  reset: () =>
    set(() => {
      const newStage = 0;
      return { stage: newStage };
    }),
}));

interface CsrfState {
  token: string | null;
  headerName: string;
  setCsrf: (token: string, headerName: string) => void;
}

export const useCsrfStore = create<CsrfState>((set) => ({
  token: null,
  headerName: "X-XSRF-TOKEN", // 기본값 (서버 응답에 따라 변경됨)
  setCsrf: (token, headerName) => set({ token, headerName }),
}));