import React,{useState,useEffect} from 'react'
import Logout from '../UserSide/Logout'
import axios from 'axios'
import "./AdminSettings.css"
const AdminSettings = ({onClose}) => {
    const [adminData, setadminData] = useState({})
    const getAdminData = async () =>{
        try {  
            const {data} =await axios.get("http://localhost:5000/admin/getadmindata",{withCredentials:true});
            console.log(data);
            setadminData(data)
        } catch (error) {
            console.log(error?.response?.message);       
        }
    }
    useEffect(() => {
     getAdminData()
    }, []) 
  return (
    <>
      <div className="ad-st-overlay">
    <div className="ad-st-panel">
      
      <div className="ad-st-header">
        <h3>Admin Settings</h3>
        <button className="ad-st-close" onClick={onClose}>×</button>
      </div>

      <div className="ad-st-content">
        <div className="ad-st-row">
          <span>Name</span>
          <p>{adminData?.name}</p>
        </div>

        <div className="ad-st-row">
          <span>Email</span>
          <p>{adminData?.email}</p>
        </div>

        <div className="ad-st-row">
          <span>Joined</span>
          <p>{new Date(adminData?.created_at).toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="ad-st-footer">
        <Logout className={"ad-st-logout-btn"} />
      </div>
    </div>
  </div>
    </>
  )
}

export default AdminSettings
