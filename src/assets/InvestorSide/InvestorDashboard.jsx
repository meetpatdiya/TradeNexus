import React from 'react'
import InvestorNavbar from './InvestorNavbar'
import Wallet from "../UserSide/Wallet"
import InvestorCoins from './InvestorCoins'
import { Outlet, useLocation } from 'react-router-dom'

const InvestorDashboard = () => {
   const { pathname } = useLocation();
    const isDashboard = pathname === "/investordashboard";
  return (
    <>
    <InvestorNavbar/>
    {isDashboard && (
        <>
          <InvestorCoins/>
        </>
      )}
      <Outlet />   
    </>
  )
}

export default InvestorDashboard
