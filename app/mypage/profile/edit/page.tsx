import React from 'react'
import EditHeader from './components/EditHeader'
import EditContainer from './components/EditContainer'

export default function page() {
  return (
    <div className='space-y-4'>
      <EditHeader />
      <EditContainer />
    </div>
  )
}
