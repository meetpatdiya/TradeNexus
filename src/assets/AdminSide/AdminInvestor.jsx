import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartsInvestorPortfolio from "./ChartsInvestorPortfolio";
const AdminInvestor = () => {
  const [investorsData, setinvestorsData] = useState([]);
  const [investorPortfolio, setinvestorPortfolio] = useState([])
    const getInvestorPortfolioData = async()=>{
        const {data} = await axios.get("http://localhost:5000/charts/investorportfolio",{withCredentials:true})
        console.log(data);
        setinvestorPortfolio(data)
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
  useEffect(() => {
    handledata();
    getInvestorPortfolioData()
  }, []);
  return (
    <>
      {investorsData.map((item, index) => {
        return (
          <div className="ad-invs">
            <p>Id: {item.user_id}</p>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>
              Created at: {new Date(item.created_at).toLocaleString("en-IN")}
            </p>
          </div>
        );
      })}
      <ChartsInvestorPortfolio data={investorPortfolio}/>
    </>
  );
};

export default AdminInvestor;
