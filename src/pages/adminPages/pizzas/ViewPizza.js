import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../utils/config";

function ViewPizza() {
  const [isLoading, setLoading] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const getPizzas = await axios.get(`${config.api}/pizzas`);
      setPizzas(getPizzas.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  let deletePizza = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`${config.api}/deletepizza/${userId}`);
      alert("Pizza Deleted Successfully");
      fetchData();
      setLoading(false);
    } catch (error) {
      alert("User Can't Deleted");
    }
  };
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-2 text-gray-800">Pizzas</h1>

        <Link
          to={"/admin/createpizza"}
          className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Create Pizza
        </Link>
      </div>

      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-danger">Pizzas Data</h6>
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
                    <th>Img</th>
                    <th>About</th>
                    <th>Stock</th>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                    <th>Extra_Large</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Img</th>
                    <th>About</th>
                    <th>Stock</th>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                    <th>Extra_Large</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {pizzas.map((pizza) => {
                    return (
                      <tr>
                        <td>{pizza.pizza_name}</td>
                        <td>
                          <img
                            src={pizza.img}
                            style={{ width: "150px", height: "80px" }}
                          />
                        </td>
                        <td>{pizza.about}</td>
                        <td>{pizza.stock}</td>
                        <td>{pizza.small}</td>
                        <td>{pizza.medium}</td>
                        <td>{pizza.large}</td>
                        <td>{pizza.extra_large}</td>
                        <td>{pizza.pizza_type}</td>
                        <td>
                          <Link
                            to={`/admin/editpizza/${pizza._id}`}
                            className="btn btn-warning m-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deletePizza(pizza._id)}
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

export default ViewPizza;
