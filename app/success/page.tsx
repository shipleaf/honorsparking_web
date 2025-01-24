"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setResponseData] = useState(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("http://localhost:8080/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    confirm()
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        router.push(`/fail?code=${error.code}&message=${error.message}`);
      });
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <div className="box_section" style={{ width: "600px" }}>
        <Image
          width={100}
          height={100}
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt=""
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
            <div className="p-grid-col text--right" id="amount">
              {`${Number(searchParams.get("amount")).toLocaleString()}원`}
            </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
            <div className="p-grid-col text--right" id="orderId">
              {`${searchParams.get("orderId")}`}
            </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
            <div
              className="p-grid-col text--right"
              id="paymentKey"
              style={{ whiteSpace: "initial", width: "250px" }}
            >
              {`${searchParams.get("paymentKey")}`}
            </div>
        </div>
        <div className="p-grid-col">
          <Link href="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link href="https://discord.gg/A4fRFXQhRu">
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}


export default function page() {
  return (
    <Suspense>
      <SuccessPage />
    </Suspense>
  )
}