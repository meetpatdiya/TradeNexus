import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="cl-h-hero">
      <div className="cl-h-overlay"></div>

      <div className="cl-h-content">
        <h1>
          Trade Crypto <span>Fast & Secure</span>
        </h1>

        <p>
          Buy, sell, and invest with real-time prices, instant transactions,
          and institutional-grade security.
        </p>

        <div className="cl-h-actions">
          <button onClick={() => navigate("/register/user")}>
            Start Trading
          </button>
          <button className="secondary" onClick={() => navigate("/register/investor")}>
            Become an Investor
          </button>
        </div>
        <div className="cl-h-trust">
      <span>🔐 Secure Wallets</span>
      <span>⚡ Instant Trades</span>
      <span>💱 Low Fees</span>
      <span>📊 Live Prices</span>
    </div>
      </div>
    </section>
  );
};

export default Hero;
