import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoaderToast.css";

const LoaderToast = ({ message, type, onClose,shape }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);

      const commonOptions = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: {
          background: "#fff",
          color: "#000",
          fontSize: "15px",
          padding: "14px 18px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.2)",
          letterSpacing: "0.5px",
        },
      };

      if (type === "success") {
        toast.success(message, commonOptions);
      } else {
        toast.error(message, commonOptions);
      }
      setTimeout(() => {
        onClose && onClose();
      }, 3000);
    }, 2000);
  }, []);

  return (
    <div>
    {loading && (
      <div className="loader-overlay">
        <div className={`loader-${shape}`}></div>
      </div>
    )}
    <ToastContainer />
  </div>
  );
};

export default LoaderToast;
