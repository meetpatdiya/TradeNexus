import { useEffect, useState } from "react";
import "./Feedback.css";
import axios from "axios";

function Feedback() {
  const [data, setData] = useState({
    summary: {
      totalFeedback: 0,
      totalPendingFeedback: 0,
      totalReviewedFeedback: 0,
      totalResolvedFeedback: 0,
    },
  });
  const [Feedbackdata, setFeedbackdata] = useState([]);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:5000/admin/feedback");
    //     setData(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
    const getFeedbackData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/getfeedback",
        );
        console.log(data);
        setFeedbackdata(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeedbackData();
  }, []);
  const deleteFeedback = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/admin/deleteFeedback",
        {
          data: { deleteId: id },
          withCredentials: true,
        },
      );
      setFeedbackdata((prev) => prev.filter((item) => item.feedback_id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fd-card-container">
      {/* <div className="fd-card">
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
      </div> */}
      {Feedbackdata.map((item, index) => (
        <div>
          <p>{item.feedback_id}</p>
          <p>{item.user_id}</p>
          <p>{item.type}</p>
          <p>{item.title}</p>
          <p>{item.message}</p>
          <p>{item.created_at}</p>
          <p>Created at: {new Date(item.created_at).toLocaleString("en-IN")}</p>
          <button onClick={() => deleteFeedback(item.feedback_id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Feedback;
