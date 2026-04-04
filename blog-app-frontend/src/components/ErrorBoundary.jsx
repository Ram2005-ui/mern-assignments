import React from 'react'
import { useRouteError } from 'react-router-dom'
function ErrorBoundary() {
    const {data,status,statusText}=useRouteError()
  return (
    <div className='text-red-700 text-4xl flex flex-col items-center mb-5'>
        <p>{data}</p>
        <p>{status}</p>
        <p>{statusText}</p>
    </div>
  )
}

export default ErrorBoundary