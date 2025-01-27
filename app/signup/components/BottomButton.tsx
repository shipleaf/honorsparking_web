import React from 'react'

export default function BottomButton() {
  return (
    <div className='fixed bottom-4 w-full px-6'>
      <div className='w-full flex justify-between'>
        <button className='bg-[#D2D2D2] text-[17px] text-[#2a2a2a] font-[500] py-4 w-[33%] rounded-[999px]'>이전</button>
        <button className='bg-[#093AEE] text-[17px] text-[#fff] font-[500] py-4 w-[64%] rounded-[999px]'>인증 번호 받기</button>
      </div>
      <div className='hidden'>
        <button>인증완료</button>
      </div>
    </div>
  )
}