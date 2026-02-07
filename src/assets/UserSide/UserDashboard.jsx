import React from 'react'
import Navbar from './Navbar'
import Coins from './Coins'
import Market from './Market'
  import Footer from './Footer'
import Logout from './Logout'
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
          <Logout/>
        </>
      )}
      <Outlet />   
      <Footer />
      </>
  )
}

export default UserDashboard
