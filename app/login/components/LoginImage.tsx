import React from 'react'
import Image from 'next/image'

export default function LoginImage() {
  return (
    <div className='relative w-full flex flex-col items-center justify-center gap-2 py-12'>
      <Image 
        src="/src/icon/LoginParking.svg"
        alt=''
        width={50}
        height={30}
      />
      <Image 
        src="/src/image/LoginCar.png"
        alt=''
        width={280}
        height={30}
        className='z-50'
      />
      <div className='absolute bg-[#999] w-[80%] h-6 rounded-[50%] blur-[5px] opacity-50 bottom-[40px] z-10'></div>
    </div>
  )
}