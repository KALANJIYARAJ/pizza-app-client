import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../utils/config";

function ViewUser() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const getPizzas = await axios.get(`${config.api}/users`);
      setUsers(getPizzas.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  let deleteUser = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`${config.api}/deleteuser/${userId}`);
      alert("User Deleted Successfully");
      fetchData();
      setLoading(false);
    } catch (error) {
      alert("User Can't Deleted");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-2 text-gray-800">Users</h1>
      </div>

      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-danger">Users Data</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.user_type}</td>
                        <td>
                          <Link
                            to={`/admin/edituser/${user._id}`}
                            className="btn btn-warning m-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="btn btn-danger m-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewUser;
