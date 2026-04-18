import React from "react";
import Image from "next/image";
import Accounting from "../Accounting/Accounting";
import { ParkingZoneInfo } from "../UserStatus";

interface InParkingProps {
  data: ParkingZoneInfo;
}

export default function InParking({ data }: InParkingProps) {
  return (
    <div>
      <div className="relative py-10 w-full flex flex-col items-start justify-center overflow-hidden">
        <Image src="/src/image/InParking.png" alt="" width={350} height={100} />
        <div className="absolute w-full rounded-[50%] bg-black h-8 bottom-8 left-[-10px] opacity-55 blur-[16px]"></div>
      </div>
      <div className="px-6 w-full mt-[-70px]">
        <Accounting data={data} />
      </div>
    </div>
  );
}
