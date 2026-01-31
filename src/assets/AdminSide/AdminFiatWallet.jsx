import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminFiatWallet = () => {
  const [fiatWalletData, setfiatWalletData] = useState([]);
  useEffect(() => {
    const getWalletData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/getfiatwallet",
        );
        console.log(Array.isArray(data));
        setfiatWalletData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWalletData();
  }, []);

  return (
    <>
      {fiatWalletData.map((item, index) => (
        <div key={index}>
          <p>Id: {item.id}</p>
          <p>User Id:{item.user_id}</p>
          <p>
            {Number(item.balance) > 0
              ? `Balance: ${item.balance}`
              : "Not Deposited"}
          </p>
          <p>
            {item.bank_last_4
              ? `Bank Account: ********${item.bank_last_4}`
              : "Not entered last 4 digits"}
          </p>
          <p>Created at: {new Date(item.updated_at).toLocaleString("en-IN")}</p>
          <br />
        </div>
      ))}
    </>
  );
};

export default AdminFiatWallet;
