import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoaderToast.css"
const LoaderToast = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      toast.success("Process completed successfully!", {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,

  style: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    padding: "14px 18px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    letterSpacing: "0.5px"
  }
});
    }, 2000);
  }, []);
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {loading && <div className="loader"></div>}
      <ToastContainer />
    </div>
  );
};

export default LoaderToast;