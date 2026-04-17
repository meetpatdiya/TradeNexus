import React, { useState, useEffect } from "react";
import api from "../ApiServices/Api";
import { useParams, useNavigate } from "react-router-dom";
import "./AdminUserDetail.css";

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const getusersData = async (id) => {
    try {
      const { data } = await api.get(
        "/admin/getuserdata",
        { params: { id } }
      );
      setuserData(data);
    } catch (error) {
      console.log(error.response);
    }
  };
 
  useEffect(() => {
    getusersData(id);
  }, [id]);

  const portfolio = userData.portfolio
    ? JSON.parse(userData.portfolio)
    : [];

  const watchlist = userData.watchlist
    ? JSON.parse(userData.watchlist)
    : [];

  return (
    <div className="ad-ud-container">

      <div className="ad-ud-topbar">
        <button
          className="ad-ud-backbtn"
          onClick={() => navigate("/admindashboard/users")}
        >
          ← Back
        </button>

        <h2 className="ad-ud-title">
          User Details - ID {userData.user_id}
        </h2>
      </div>

      <div className="ad-ud-grid">

        <div className="ad-ud-section">
          <h3 className="ad-ud-section-title">Portfolio</h3>

          {portfolio.length === 0 ? (
            <p className="ad-ud-empty">No Portfolio Data</p>
          ) : (
            portfolio.map((item, index) => (
              <div key={index} className="ad-ud-card">
                <p><span>Crypto</span>{item.crypto_name}</p>
                <p><span>Quantity</span>{item.total_quantity}</p>
                <p><span>Avg Buy</span>${item.avg_buy_price}</p>
                <p>
                  <span>Updated</span>
                  {new Date(item.updated_at).toLocaleString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="ad-ud-section">
          <h3 className="ad-ud-section-title">Watchlist</h3>

          {watchlist.length === 0 ? (
            <p className="ad-ud-empty">No Watchlist Data</p>
          ) : (
            watchlist.map((item, index) => (
              <div key={index} className="ad-ud-card watch">
                <p><span>Crypto</span>{item.crypto_id}</p>
                <p>
                  <span>Added</span>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString("en-IN")
                    : "N/A"}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminUserDetail;