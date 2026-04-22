import React from 'react'
import Navbar from './Navbar'
import Coins from './Coins'
import Market from './Market'
import Hero from './Hero'
import Footer from './Footer'
import SubFooter from '../CommonLandingPages/SubFooter'
import { Outlet, useLocation } from 'react-router-dom'
const UserDashboard = () => {
   const { pathname } = useLocation();
  const isDashboardHome = pathname === "/userdashboard";
  return (
    <> 
    <Navbar />
      {isDashboardHome && (
        <>
        <Hero/>
          <Market/> 
          <Coins />
        </>
      )}
      <Outlet />   
      <Footer/>
      <SubFooter/>
      </>
  )
}

export default UserDashboard
