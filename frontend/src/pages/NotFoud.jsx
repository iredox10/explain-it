import React from 'react'
import Header from '../components/Header'
import NsHeader from '../components/NsHeader'

const NotFoud = () => {
  return (
    <div>
        <NsHeader />
        <div className='grid place-content-center min-h-screen'>
            <h1 className='text-primary-color font-bold text-7xl text-center'><span className='block text-4xl'>PAGE</span>NOT FOUND</h1>
        </div>
    </div>
  )
}

export default NotFoud