import React from 'react'
import "./InvestorHero.css"
import invImg from "../Images/invImg.png"
const InvestorHero = () => {
  return (
   <div className="in-cn-hero">
        <div className="in-cn-hero-left">
          <h1>Invest Smart.<br />Earn Together.</h1>
          <p>
            A seamless crypto ecosystem connecting investors, admins, and users —
            enabling secure transactions and shared growth opportunities.
          </p>

          <div className="hero-stats">
            <div>
              <h3>Secure</h3>
              <p>Asset Flow</p>
            </div>
            <div>
              <h3>Smart</h3>
              <p>Investment System</p>
            </div>
            <div>
              <h3>Shared</h3>
              <p>Commission Model</p>
            </div>
          </div>
        </div>
        <div className="in-cn-hero-right">
          <img src={invImg}   alt="crypto" />
        </div>
      </div>
  )
}

export default InvestorHero
