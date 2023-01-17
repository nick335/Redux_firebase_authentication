import React from 'react'
import SignUp from './SignUp'

export default function PageTemplate() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh', width:'100vw'}}>
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <SignUp />
      </div>
    </div>
  )
}
