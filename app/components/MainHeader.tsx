"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SidebarDrawer from "../common/SidebarDrawer";
import { useSidebar } from "@/app/hooks/useSidebar";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

const apiUrl = process.env.NEXT_PUBLIC_SEVER_URL;

const fetchSessionInfo = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/session/info`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data;
};

export default function MainHeader() {
  const { isOpen, open, close } = useSidebar();
  const router = useRouter();
  const unreadCount = 1;
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isLoading, isError } = useQuery({
    queryKey: ["sessionInfo"],
    queryFn: fetchSessionInfo,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      setIsLoginModal(true);
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-white">
        <ClipLoader size={48} color="#2221d0" />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-5 items-center p-6 w-full">
        <button className="justify-self-start pl-2" onClick={open}>
          <Image src="/src/icon/SideBar.svg" alt="" width={24} height={24} />
        </button>
        <span className="font-bold text-center col-span-3">HONORS KOREA</span>
        <button
          className="justify-self-end"
          onClick={() => router.push("/notice?page=1")}
        >
          {unreadCount > 0 ? (
            <Image
              src="/src/icon/NewNotification.svg"
              alt=""
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/src/icon/Notification.svg"
              alt=""
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
      <SidebarDrawer isOpen={isOpen} onClose={close} />
      {isLoginModal && (
        <div className="fixed inset-0 bg-white z-[1000]">
          <Modal
            isOpen={isLoginModal}
            onClose={() => {}}
            title="로그인 후 이용 가능합니다."
            backdropClassName="bg-opacity-30"
            contentClassName="p-10 pb-4"
          >
            <div className="w-full mt-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => router.push("login")}
              >
                로그인
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
