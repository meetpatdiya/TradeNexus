import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({className}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true },
      );
      navigate("/");
    } catch (err) {
      console.error("Logout failed");
    }
  };
  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
};
export default Logout;
