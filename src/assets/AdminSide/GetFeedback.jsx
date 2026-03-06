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
      const res = await axios.put(
        "http://localhost:5000/admin/resolvefeedback",
        { feedback_id: id },
        { withCredentials: true },
      );
      setFeedbackdata((prev) => prev.filter((item) => item.feedback_id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fd-card-container">
      {Feedbackdata.map((item, index) => (
        <div>
          <p>{item.feedback_id}</p>
          <p>{item.user_id}</p>
          <p>{item.type}</p>
          <p>{item.title}</p>
          <p>{item.message}</p>
          <p>{item.created_at}</p>
          <p>Created at: {new Date(item.created_at).toLocaleString("en-IN")}</p>
          <button onClick={() => deleteFeedback(item.feedback_id)}>
            Resolve Feedback
          </button>
        </div>
      ))}
    </div>
  );
}

export default Feedback;
