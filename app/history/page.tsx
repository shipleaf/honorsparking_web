import React from 'react'
import HistoryHeader from './components/HistoryHeader'
import History from './components/History'

export default function page() {
  return (
    <div className='bg-[#f0f0f0] min-h-[100vh]'>
      <HistoryHeader />
      <History />
    </div>
  )
}
