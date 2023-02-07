import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../utils/config";
import { UserContext } from "../utils/UserContext";

function OrderItems() {
  const { order, setOrder } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchData = async () => {
      try {
        setLoading(true);
        const getOrder = await axios.get(`${config.api}/order/${user._id}`);
        setOrder(getOrder.data);
        setLoading(false);
      } catch (error) {
        alert("could't get order");
      }
    };
    fetchData();
  }, []);

  let cancel = async (_id) => {
    try {
      await axios.put(`${config.api}/ordercansel/${_id}`);
      alert("Your order successfully cansel");
      navigate("/portal/base");
    } catch (error) {
      alert("Error for cansel to your order");
    }
  };

  console.log(order);

  return (
    <div className="container m-2 ">
      <Link className="btn btn-danger btn-sm m-3" to={"/portal/base"}>
        home
      </Link>
      {order.map((orderItem, index) => {
        return (
          <div className="row align-items-center border p-3 m-3">
            <div className="col-xl-5">
              {orderItem.pizza.map((Pizza, index) => {
                return (
                  <div className=" row p-2">
                    <div className="col-2">
                      <img
                        src={Pizza.image}
                        alt="pizza Image"
                        style={{ height: "50px", width: "50px" }}
                      />
                    </div>
                    <div className="col-8 mx-3">
                      <h5>Pizza Name:{Pizza.pizza_name}</h5>
                      <h6>Pizza Size:{Pizza.size}</h6>
                      <h6>Quantity : {Pizza.quantity}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-xl-5 my-2 m-1">
              <h6>Pizza Price: &nbsp; ₹ {orderItem.sub_total}</h6>
              <h6>Pizza tax: &nbsp; ₹ {orderItem.tax}</h6>
              <h6>Pizza Total: &nbsp; ₹ {orderItem.total}</h6>
              <h6>Order status: {orderItem.order_status}</h6>
              <h6>Payment status:{orderItem.payment_status}</h6>
            </div>
            <div className="col-xl-1 m-1">
              <button
                className="btn btn-danger"
                onClick={() => cancel(orderItem._id)}
              >
                Cansel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderItems;
