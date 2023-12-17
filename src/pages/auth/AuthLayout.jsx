import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AuthLayout = () => {
 
const isAuthenticated =false

  return(
<> 
  {
    isAuthenticated?(
      <Navigate to="/"/>
    ):(
      <>
      <section className='flex justify-center h-screen'>
        <Outlet/>
      </section>
      </>
    )
  }
</>
  )
  }
export default AuthLayout