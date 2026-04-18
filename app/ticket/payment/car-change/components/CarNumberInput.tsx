import Image from 'next/image'
import React from 'react'
import Input from '@/app/components/ui/Input'

export default function CarNumberInput() {
  return (
    <div className="bg-white rounded-[1rem] p-4 space-y-3">
      <div className="flex gap-2">
        <Image src="/src/icon/Information.svg" alt="" width={24} height={24} />
        <span className="font-[700] text-[17px] text-[#2a2a2a]">차량 번호</span>
      </div>
      <Input placeholder='33나 3333' className="placeholder:text-grey-800" />
    </div>
  )
}
