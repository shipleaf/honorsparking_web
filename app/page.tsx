"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSessionInfo } from "./api/UserActivity";
import { useEffect, useState } from "react";
import LoginCaution from "./components/login/LoginCaution";
import { useRouter } from "next/navigation";

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-[#fff]">
        <span className="loader !w-[48px] !bg-[#2221d0]"></span>
      </div>
    );
  }
  return <div>{isLoginModal && <LoginCaution />}</div>;
}
