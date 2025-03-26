import React from "react";
import Image from "next/image";

export default function OutParking() {
  return (
    <div className="py-10 relative w-full flex flex-col items-end justify-center overflow-hidden">
      <Image src="/src/image/OutParking.png" alt="" width={350} height={100} />
      <div className="absolute w-full rounded-[50%] bg-black h-8 bottom-8 left-6 opacity-55 blur-[16px]"></div>
    </div>
  );
}