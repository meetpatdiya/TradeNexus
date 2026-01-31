import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminInvestor = () => {
  const [investorsData, setinvestorsData] = useState([]);
  useEffect(() => {
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
    handledata();
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
    </>
  );
};

export default AdminInvestor;
