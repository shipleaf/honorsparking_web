import axios from "axios";
import apiClient from "./axiosWithCsrf";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

// 카카오 로그인 반환값 타입
// interface KakaoLoginResponse {
//   nickname: string;
//   phone_number: string;
//   email: string;
//   birthyear: string;
//   birthday: string;
// }

export interface SignupStateAPI {
  platform: string;
  name: string;
  mobile: string;
  birthyear: string;
  birthday: string;
  carNumber: string;
  accountId: string;
  accountPassword: string;
  email: string;
}

export interface loginState {
  username: string;
  password: string;
}

export const SignUp = async (signupData: SignupStateAPI): Promise<void> => {
  try {
    // await apiClient.post(`/api/v1/auth/join`, signupData, {
    await axios.post(`/api/v1/auth/join`, signupData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    console.error("❌ 회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    throw error;
  }
};

export const SendPhoneAuth = async (phoneNumber: string) => {
  try {
    // const response = await apiClient.post(
    const response = await axios.post(
      "/api/v1/phone-auth/send",
      { phoneNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("전화번호 인증 요청 실패:", error);
    throw error;
  }
};

export const CheckPhoneAuth = async (phoneNumber: string, authCode: string) => {
  try {
    // const response = await apiClient.post(
    const response = await axios.post(
      "/api/v1/phone-auth/verify",
      { phoneNumber, authCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("전화번호 인증 검증 실패:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/logout`, {
      withCredentials: true,
    });

    console.log("로그아웃 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};

export const getCsrf = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/csrf-token`, {
    withCredentials: true,
  });
  return response.data;
};

export const checkDuplication = async (id: string) => {
  const response = await apiClient.get(
    `${apiUrl}/api/v1/auth/check-authId?authId=${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const loginWithSessionId = async (sessionId: string) => {
  const response = await axios.post(
    `${apiUrl}/api/v1/auth/custom-session-login`,
    { sessionId },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
