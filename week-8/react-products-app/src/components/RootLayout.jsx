import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
function RootLayout() {
  return (
    <div>
    <Header />
        {/* component placeholder */}
        <div className='mx-20 min-h-screen'>
            <Outlet />

        </div>
        </div>

  )
}

export default RootLayout