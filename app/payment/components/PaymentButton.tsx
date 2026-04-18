import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

interface PaymentButtonProps {
  price: number;
}

export default function PaymentButton({ price }: PaymentButtonProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/payment/tosspayment");
  };

  const fomattedPrice = price.toLocaleString();
  return (
    <div className="fixed w-[90%] max-w-[691px] bottom-[5vh] left-1/2 -translate-x-1/2">
      <Button fullWidth onClick={handleNavigate}>
        {fomattedPrice}원 결제하기
      </Button>
    </div>
  );
}
