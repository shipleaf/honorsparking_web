import React from 'react'
import LoginImage from './components/LoginImage'
import LoginFormContainer from './components/LoginFormContainer'
import Footer from '../components/Footer/Footer'

export default function page() {
  return (
    <div className='bg-[#F0F0F0]'>
      <LoginImage />
      <LoginFormContainer />
      <Footer />
    </div>
  )
}
