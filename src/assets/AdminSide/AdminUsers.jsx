import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [userData, setuserData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handledata = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/getusers");
      setuserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowDetail = (id) => {
    navigate(`/admindashboard/users/${id}`);
  };
  const filteredUsers = userData.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.user_id.toString().includes(search),
  );

  useEffect(() => {
    handledata();
  }, []);

  return (
    <div className="ad-u-container">
      {!id && (
        <>
          <h2 className="ad-u-title">All Users</h2>
          <input
            type="text"
            placeholder="Search by User ID or Email"
            className="ad-u-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="ad-u-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr
                  key={item.user_id}
                  className="ad-u-row"
                  onClick={() => handleShowDetail(item.user_id)}
                >
                  <td>{item.user_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{new Date(item.created_at).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default AdminUsers;
