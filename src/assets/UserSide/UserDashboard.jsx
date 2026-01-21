import React from 'react'
import Navbar from './Navbar'
import Coins from './Coins'
import Wallet from './Wallet'
import HeroSection from './HeroSection'
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
          <HeroSection />
          <Wallet />
        </>
      )}

      <Outlet />   

      <Footer />
      </>
  )
}

export default UserDashboard
