import react from "react";
import "./HeroSection.css";
import Bitcoin from "../Images/Bitcoin.png";

function HeroSection() {
  return (
    <>
      <div className="first-Part">
        <div className="first-psrt-content">
          <h1>Bitcoin News & Market Insights</h1>
          <p>
            Stay updated with the latest Bitcoin news, real-time price
            movements, market trends, and expert insights. Bitcoin continues to
            dominate the crypto market as investors closely watch institutional
            adoption, ETF developments, and global regulations. Track price
            volatility, trading volume, and on-chain data — all in one place.
          </p>
        </div>
        <div className="first-part-image">
          <img src={Bitcoin} alt="Bitcoin Img" />
        </div>
      </div>
    </>
  );
}
export default HeroSection;
