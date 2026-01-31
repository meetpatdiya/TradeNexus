import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminUsers = () => {
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    const handledata = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/getusers",
        );
        setuserData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    handledata();
  }, []);
  return (
    <>
      <div className="cards">
        {userData.map((item, index) => {
          return (
            <div className="ad-user">
              <p>Id: {item.user_id}</p>
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              <p>Created at: {new Date(item.created_at).toLocaleString("en-IN")}</p>
            </div>
          );
        })}
        {/* <AdminWithdrawList></AdminWithdrawList> */}
      </div>
    </>
  );
};

export default AdminUsers;
