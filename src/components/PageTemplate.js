import React from 'react'
import Login from './Login'
import { Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import UpdateProfile from './UpdateProfile'


export default function PageTemplate() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh', width:'100vw'}}>
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Routes>
          <Route path='/' element= { 
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path='/signup' element={ <SignUp /> }  />
          <Route path='/login'  element={ <Login /> }  />
          <Route path='/updateProfile' element={ <UpdateProfile /> } />
        </Routes>
      </div>
    </div>
  )
}
