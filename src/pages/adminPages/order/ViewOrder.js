import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../utils/config";

function ViewOrder() {
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const getOrders = await axios.get(`${config.api}/orders`);
      setOrders(getOrders.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  let deleteOrder = async (vmId) => {
    try {
      setLoading(true);
      await axios.delete(`${config.api}/deleteorder/${vmId}`);
      alert("Order Deleted Successfully");
      fetchData();
      setLoading(false);
    } catch (error) {
      alert("Order Can't Deleted");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-2 text-gray-800">Orders</h1>
      </div>

      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-danger">Orders Data</h6>
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
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Payment_type</th>
                    <th>Payment_status</th>
                    <th>Pizza Name</th>
                    <th>Pizza Size</th>
                    <th>Add Items</th>
                    <th>total</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Payment_type</th>
                    <th>Payment_status</th>
                    <th>Pizza_name</th>
                    <th>Pizza_size</th>
                    <th>Add Items</th>
                    <th>total</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.address}</td>
                        <td>{order.payment_type}</td>
                        <td>{order.payment_status}</td>
                        <td>{order.pizza_name}</td>
                        <td>{order.pizza_size}</td>
                        <td>
                          {order.add_items.map((item) => {
                            return <p>{item.item_name}</p>;
                          })}
                        </td>
                        {/* <td>{order.add_items}</td> */}
                        <td>{order.total}</td>
                        <td>{order.order_status}</td>
                        <td>
                          <Link
                            to={`/admin/editorder/${order._id}`}
                            className="btn btn-warning m-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteOrder(order._id)}
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

export default ViewOrder;
