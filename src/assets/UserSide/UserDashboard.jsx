import React from 'react'
import Navbar from './Navbar'
import Coins from './Coins'
import Market from './Market'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
const UserDashboard = () => {
   const { pathname } = useLocation();
  const isDashboardHome = pathname === "/userdashboard";
  return (
    <> 
    <Navbar />
      {isDashboardHome && (
        <>
          <Coins />
          <Market/>
        </>
      )}
      <Outlet />   
      <Footer/>
      </>
  )
}

export default UserDashboard
