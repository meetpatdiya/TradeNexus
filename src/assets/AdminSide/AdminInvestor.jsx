import React, { useState, useEffect } from "react";
import api from "../ApiServices/Api";
import ChartsInvestorPortfolio from "./ChartsInvestorPortfolio";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import ChartInvestorComm from "./ChartInvestorComm";
import "./AdminInvestor.css";
const AdminInvestor = () => {
  const [investorsData, setinvestorsData] = useState([]);
  const [investorPortfolio, setinvestorPortfolio] = useState([]);
  const [investorComm, setinvestorComm] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const getInvestorPortfolioData = async () => {
    const { data } = await api.get("/charts/investorportfolio");
    setinvestorPortfolio(data);
  };
  const getInvestorCommission = async () => {
    const { data } = await api.get("/charts/investorcomm");
    setinvestorComm(data);
    console.log(data);
  };
  const handledata = async () => {
    try {
      const { data } = await api.get("/admin/getinvestors");
      setinvestorsData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleshowInvestor = (id) => {
    navigate(`/admindashboard/invester/${id}`);
  };
  const toggleFreeze = async (userId, status) => {
    try {
      const { data } = await api.put(
        "/admin/suspenduser",{ userId, status });
      handledata();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredInvestor = investorsData.filter(
    (inv) =>
      inv.email.toLowerCase().includes(search.toLowerCase()) ||
      inv.user_id.toString().includes(search),
  );
  useEffect(() => {
    handledata();
    getInvestorPortfolioData();
    getInvestorCommission();
  }, []);
  return (
   <>
  {!id && (
    <div className="ad-i-container">

      {/* Charts Section */}
      <div className="ad-i-charts">
        <div className="ad-i-chart-card">
          <ChartsInvestorPortfolio data={investorPortfolio} />
        </div>

        <div className="ad-i-chart-card">
          <ChartInvestorComm data={investorComm} />
        </div>
      </div>

      {/* Search */}
      <div className="ad-i-search-box">
        <input
          type="text"
          value={search}
          placeholder="Search by Investor ID or Email"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="ad-i-table">
        <div className="ad-i-table-header">
          <p>ID</p>
          <p>Name</p>
          <p>Email</p>
          <p>Joined</p>
          <p>Action</p>
        </div>

        {filteredInvestor.map((item) => (
          <div
            key={item.user_id}
            className="ad-i-row"
            onClick={() => handleshowInvestor(item.user_id)}
          >
            <p>{item.user_id}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{new Date(item.joined).toLocaleString("en-IN")}</p>
            <p>
              <button
                className={`ad-i-action-btn ${
                  item.account_status === 1 ? "i-suspend" : "i-activate"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFreeze(
                    item.user_id,
                    item.account_status === 1 ? 0 : 1
                  );
                }}
              >
                {item.account_status === 1 ? "Suspend" : "Activate"}
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
  <Outlet />
</>
  );
};

export default AdminInvestor;
