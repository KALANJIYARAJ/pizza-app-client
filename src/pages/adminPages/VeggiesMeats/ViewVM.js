import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../utils/config";

function ViewVM() {
  const [isLoading, setLoading] = useState(false);
  const [vms, setVms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const getPizzas = await axios.get(`${config.api}/veggies_meats`);
      setVms(getPizzas.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  let deletevm = async (vmId) => {
    try {
      setLoading(true);
      await axios.delete(`${config.api}/deletevm/${vmId}`);
      alert("Veggies$meat  Deleted Successfully");
      fetchData();
      setLoading(false);
    } catch (error) {
      alert("Veggies$meat Can't Deleted");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-2 text-gray-800">Veggies$Meat</h1>

        <Link
          to={"/admin/createvm"}
          className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Create
          Veggies$Meat
        </Link>
      </div>

      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-danger">
              Veggies$Meat Data
            </h6>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {vms.map((vm) => {
                    return (
                      <tr>
                        <td>{vm.item_name}</td>
                        <td>{vm.item_icon_name}</td>
                        <td>{vm.item_price}</td>
                        <td>{vm.item_type}</td>
                        <td>
                          <Link
                            to={`/admin/editvm/${vm._id}`}
                            className="btn btn-warning m-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deletevm(vm._id)}
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

export default ViewVM;
