import "./AdminFooter.css";
import logo from "../Images/Logo.png";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">
        
        <div className="footer-left">
          <div className="logo-section">
            <img src={logo} alt="TradeNexus Logo" />
            <h2>TradeNexus Admin</h2>
          </div>
          <p className="tagline">🔐 Authorized Access Only</p>
        </div>

        <div className="footer-center">
          <p>
            This dashboard is intended for administrative use only. All actions
            directly impact platform performance, security, and user experience.
          </p>

          <ul>
            <li>✔ Monitor transactions</li>
            <li>✔ Review system data</li>
            <li>✔ Manage platform resources</li>
          </ul>
        </div>

        <div className="footer-right">
          <p className="warning">
            ⚠️ Unauthorized or incorrect actions may affect system stability.
          </p>

          <p className="version">Version 1.0.0</p>
          <p className="status">Secure & Operational ✅</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;