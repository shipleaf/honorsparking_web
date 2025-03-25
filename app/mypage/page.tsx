import React from "react";
import FooterNav from "../common/FooterNav";
import MyPageHeader from "./components/MypageHeader";
import MyPagePayment from "./components/MyPagePayment";
import MyMenu from "./components/MyMenu";

export default function page() {
  return (
    <div className="bg-[#f0f0f0] h-[100vh] pb-[15vh] overflow-auto scrollbar-hide">
      <MyPageHeader />
      <FooterNav currentpage="mypage" />
      <div className="space-y-10">
        <MyPagePayment />
        <MyMenu />
      </div>
    </div>
  );
}