"use client";

import React from "react";
import SideBar from "./SideBar";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } z-[1000]`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-0 top-0 left-0 shadow-lg transform transition-transform duration-300 w-[80vw] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <SideBar />
      </div>
    </div>
  );
}
