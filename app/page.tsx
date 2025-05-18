"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSessionInfo } from "./api/UserActivity";
import { useEffect, useState } from "react";
import LoginCaution from "./components/login/LoginCaution";
import { useRouter } from "next/navigation";
import { loginWithSessionId } from "./api/useSocialLoginAPI";

export default function Home() {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const router = useRouter();
  const { isError, isLoading } = useQuery({
    queryKey: ["sessionInfo"],
    queryFn: fetchSessionInfo,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      setIsLoginModal(true);
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (!isLoading && !isError) {
      router.push("/home")
    }
    // eslint-disable-next-line
  }, [isLoading, isError]);

  useEffect(() => {
    // eslint-disable-next-line
    const handler = (event: any) => {
      try {
        const { sessionId } = event.detail;
        if (!sessionId) {
          return;
        }
        loginWithSessionId(sessionId);
        router.push("/home");
      } catch (error) {
        console.error("❌ sessionReceived 이벤트 처리 중 오류:", error); // TODO: 소셜 로그인 오류 모달처리
      }
    };

    window.addEventListener("sessionReceived", handler);

    return () => {
      window.removeEventListener("sessionReceived", handler);
    };
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-[#fff]">
        <span className="loader !w-[48px] !bg-[#2221d0]"></span>
      </div>
    );
  }
  return <div>{isLoginModal && <LoginCaution />}</div>;
}
