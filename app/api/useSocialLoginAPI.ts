import { SignupState } from "@/store/useSignupStore";
import axios from "axios";

// 카카오 로그인 반환값 타입
interface KakaoLoginResponse {
  nickname: string;
  phone_number: string;
  email: string;
  birthyear: string;
  birthday: string;
}

export const SignUp = async (signupData: SignupState): Promise<void> => {
  try {
    await axios.post("http://localhost:8080/api/v1/auth/join", signupData, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ 회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    throw error;
  }
};

// 로그인 API
export const useLogin = async (): Promise<KakaoLoginResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log("로그인 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/logout", {
      withCredentials: true,
    });

    console.log("로그아웃 성공", response.data);
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};
