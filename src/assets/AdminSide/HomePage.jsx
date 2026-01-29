import axios from "axios";
import {useState,useEffect} from "react"
function HomePage() {
  const [state, setstate] = useState({})
  useEffect(() => {
    const handledata = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/admin/dashboard");
        setstate(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    handledata();
  }, [])
  
  return (
    <>
  <div className="cards">
     {/* <AdminWithdrawList></AdminWithdrawList> */}
    <div> Total User : {state.totalUsers} </div>
  </div>
    </>
  )
}

export default HomePage