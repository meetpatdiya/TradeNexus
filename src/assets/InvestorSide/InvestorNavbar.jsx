import React from "react";
import { Link } from "react-router-dom";

const InvestorNavbar = () => {
  return (
    <div>
      <div>
        <Link to={''}>Home</Link> 
        <Link to={'wallet'}>Wallet</Link>
        <Link to={'portfolio'}>Portfolio</Link>
        <Link to={'transactions'}>Transactions</Link>
        <Link to={''}>Invest / Withdraw</Link>
      </div>
    </div>
  );
};

export default InvestorNavbar;
