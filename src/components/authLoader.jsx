import React from 'react'

const AuthLoader = () => {
  return (
    <div className='absolute inset-0 bg-black bg-opacity-50 min-h-screen grid place-items-center z-[99999]'>
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  )
}

export default AuthLoader