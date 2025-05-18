"use client";

import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import MyProfile from "./components/MyProfile";

export default function page() {
  return (
    <div className="bg-[#fff] min-h-[100vh] space-y-4">
      <ProfileHeader />
      <MyProfile />
    </div>
  );
}
