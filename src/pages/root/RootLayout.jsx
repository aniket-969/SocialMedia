import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/sidebar'

const RootLayout = () => { 
  return ( 
    <>
    <Topbar/>
    <Sidebar/>
    <div><Outlet/></div>
    </>
  )
}

export default RootLayout