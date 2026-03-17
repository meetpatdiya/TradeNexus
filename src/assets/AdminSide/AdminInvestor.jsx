import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartsInvestorPortfolio from "./ChartsInvestorPortfolio";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import ChartInvestorComm from "./ChartInvestorComm";
import "./AdminInvestor.css"
const AdminInvestor = () => {
  const [investorsData, setinvestorsData] = useState([]);
  const [investorPortfolio, setinvestorPortfolio] = useState([])
  const [investorComm, setinvestorComm] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()
    const getInvestorPortfolioData = async()=>{
        const {data} = await axios.get("http://localhost:5000/charts/investorportfolio",{withCredentials:true})
        setinvestorPortfolio(data)
    }    
    const getInvestorCommission = async()=>{
        const {data} = await axios.get("http://localhost:5000/charts/investorcomm",{withCredentials:true})
        setinvestorComm(data)
        console.log(data);
    }    
    const handledata = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/getinvestors",
        );
        setinvestorsData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      } 
    };
    const handleshowInvestor = (id)=>{
      navigate(`/admindashboard/invester/${id}`)
    }
    const toggleFreeze = async (userId, status) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/admin/suspenduser",
        { userId, status },
        { withCredentials: true },
      );
      handledata()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handledata();
    getInvestorPortfolioData()
    getInvestorCommission()
  }, []);
  return (
    <>
    {!id && (
      <>
        <ChartsInvestorPortfolio data={investorPortfolio}/> <br /> <br />
        <ChartInvestorComm data={investorComm}/> <br /> <br />
      {investorsData.map((item, index) => {
        return (
          <div className="ad-i" onClick={()=>handleshowInvestor(item.user_id)}>
            <p>Id: {item.user_id}</p>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Joined: {new Date(item.joined).toLocaleString("en-IN")}</p>
            <p>Action:  <button
                     className={`ad-i-action-btn ${item.account_status === 1 ? "i-suspend" : "i-activate"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFreeze(
                          item.user_id,
                          item.account_status === 1 ? 0 : 1,
                        );
                      }}
                    > 
                      {item.account_status === 1 ? "Suspend" : "Activate"}
                    </button></p>
            <p>
            </p>
          </div>
        );
      })}
      </>
    )}
      <Outlet/>
    </>
  );
};

export default AdminInvestor;

