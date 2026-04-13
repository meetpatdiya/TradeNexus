import React from 'react'
import InvestorNavbar from './InvestorNavbar'
import InvestorCoins from './InvestorCoins'
import { Outlet, useLocation } from 'react-router-dom'
import InvestorFooter from './InvestorFooter'
import InvestorGuide from './InvestorGuide'
import InvestorHero from './InvestorHero'
import Extra from "../CommonLandingPages/Extra"
const InvestorDashboard = () => {
   const { pathname } = useLocation();
    const isDashboard = pathname === "/investordashboard";
  return (
    <>
    <InvestorNavbar/>
    {isDashboard && (
        <>
        <InvestorGuide/>
        <InvestorHero/>
        <Extra/>
          <InvestorCoins/>

        </>
      )}
      <Outlet />  
      <InvestorFooter/> 
    </>
  )
}

export default InvestorDashboard
