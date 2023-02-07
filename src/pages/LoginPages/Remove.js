import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Remove() {
  const navigate = useNavigate();
  localStorage.removeItem("pizza-app");
  localStorage.removeItem("user");

  useEffect(() => {
    navigate("/");
  }, []);
}

export default Remove;
