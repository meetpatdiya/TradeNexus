import { useEffect, useState } from "react";
import "./Feedback.css";
import axios from "axios";

function Feedback() {
  const [data, setData] = useState({
    summary: {
      totalFeedback: 0,
      totalPendingFeedback: 0,
      totalReviewedFeedback: 0,
      totalResolvedFeedback: 0
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/feedback");
        setData(res.data);
      } catch (err) {
        console.log(err);
      } 
    };
    fetchData();
  }, []);



  return (
    <div className="fd-card-container">
      <div className="fd-card">
        <h2>Total Feedback</h2>
        <p>{data?.summary?.totalFeedback ?? 0}</p>
      </div>
      <div className="fd-card">
        <h2>Pending Feedback</h2>
        <p>{data?.summary?.totalPendingFeedback ?? 0}</p>
      </div>
      <div className="fd-card">
        <h2>Reviewed Feedback</h2>
        <p>{data?.summary?.totalReviewedFeedback ?? 0}</p>
      </div>
      <div className="fd-card">
        <h2>Resolved Feedback</h2>
        <p>{data?.summary?.totalResolvedFeedback ?? 0}</p>
      </div>
    </div>
  );
}

export default Feedback;