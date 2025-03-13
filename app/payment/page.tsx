import React from "react";
import PaymentHeader from "./components/PaymentHeader";
import PaymentMethod from "./components/PaymentMethod";
import PaymentTicketComponent from "./components/PaymentTicketComponent";

export default function page() {
  return (
    <div className="bg-[#f0f0f0] flex flex-col gap-8 w-full h-[100vh]">
      <PaymentHeader />
      <div className="flex flex-col px-6 w-full gap-4">
        <PaymentMethod />
        <PaymentTicketComponent />
      </div>
    </div>
  );
}