import api from "../ApiServices/Api";
import { useNavigate } from "react-router-dom";

const Logout = ({className}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout");
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
