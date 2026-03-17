import { useEffect, useState } from "react";
import "./Feedback.css";
import axios from "axios";

function Feedback() {
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
      await axios.put(
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
     <div className="af-container">
  <h2 className="af-title">User Feedback</h2>

  <div className="af-table-wrapper">
    <table className="af-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Type</th>
          <th>Title</th>
          <th>Message</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {Feedbackdata.map((item) => (
          <tr key={item.feedback_id}>
            <td>{item.feedback_id}</td>
            <td>{item.user_id}</td>
            <td>
              <span className={`af-type af-${item.type}`}>
                {item.type}
              </span>
            </td>
            <td className="af-title-cell">{item.title}</td>
            <td className="af-message">{item.message}</td>
            <td>
              {new Date(item.created_at).toLocaleString("en-IN")}
            </td>
            <td>
              <button
                className="af-resolve-btn"
                onClick={() => deleteFeedback(item.feedback_id)}
              >
                Resolve
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default Feedback;
