import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartsInvestorPortfolio from "./ChartsInvestorPortfolio";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import ChartInvestorComm from "./ChartInvestorComm";
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
          <div className="ad-invs" onClick={()=>handleshowInvestor(item.user_id)}>
            <p>Id: {item.user_id}</p>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Joined: {new Date(item.joined).toLocaleString("en-IN")}</p>
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

