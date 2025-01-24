"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

function FailPage() {
  const searchParams = useSearchParams();

  return (
    <>
      <div id="info" className="box_section" style={{ width: "600px" }}>
        <Image
          width={100}
          height={100}
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
        />
        <h2>결제를 실패했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>에러메시지</b>
          </div>
          <Suspense>
            <div
              className="p-grid-col text--right"
              id="message"
            >{`${searchParams.get("message")}`}</div>
          </Suspense>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>에러코드</b>
          </div>
          <Suspense>
            <div
              className="p-grid-col text--right"
              id="code"
            >{`${searchParams.get("code")}`}</div>
          </Suspense>
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
      <FailPage />
    </Suspense>
  )
}