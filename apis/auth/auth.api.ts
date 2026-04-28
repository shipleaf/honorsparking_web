import apiClient from "../apiClient";
import { SignupStateAPI } from "./auth.type";

export const signup = async (signupData: SignupStateAPI): Promise<void> => {
  try {
    await apiClient.post(`/auth/join`, signupData);
  } catch (error) {
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    throw error;
  }
};

export const sendPhoneAuth = async (phoneNumber: string) => {
  try {
    const response = await apiClient.post('/phone-auth/send', phoneNumber);
    return response.data;
  } catch (error) {
    console.error("전화번호 인증 요청 실패:", error);
    throw error;
  }
};

export const checkPhoneAuth = async (phoneNumber: string, authCode: string) => {
  try {
    const response = await apiClient.post('/phone-auth/verify', { phoneNumber, authCode });
    return response.data;
  } catch (error) {
    console.error("전화번호 인증 검증 실패:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.get('/logout');
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};

export const getCsrf = async () => {
  const response = await apiClient.get('/csrf-token')
  return response.data;
};

export const checkDuplication = async (id: string) => {
  const response = await apiClient.get('/auth/check-authId?authId=${id}');
  return response.data;
};

export const loginWithSessionId = async (sessionId: string) => {
  const response = await apiClient.post('/auth/custom-session-login', sessionId);
  return response.data;
};
