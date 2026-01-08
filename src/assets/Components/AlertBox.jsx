import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./AlertBox.css";

const AlertBox = ({
  message,
  type = "success", // success | error
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
console.log('alertbox called')
  return (
    <div className={`ra-alert ra-${type}`}>
      <span>{message}</span>
      <IoClose className="ra-close" size={18} onClick={onClose} />
      <div className="ra-line" />
    </div>
  );
};

export default AlertBox;
