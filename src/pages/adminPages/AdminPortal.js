import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../../component/AdminNav";
import { config } from "../../utils/config";
import { UserContext } from "../../utils/UserContext";

function AdminPortal() {
  const user_id = localStorage.getItem("user");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const getUser = await axios.get(`${config.api}/user/${user_id}`, {
        headers: {
          Authorization: localStorage.getItem("pizza-app"),
        },
      });
      setUser(getUser.data[0]);
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };

  return (
    <div className="container-fluid">
      <AdminNav />
      <div className="container-fluid text-center m-2">
        <div className="row justify-content-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPortal;
