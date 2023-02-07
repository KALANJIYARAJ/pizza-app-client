import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";
import { UserContext } from "../UserContext";

function OrderItems() {

    const { order, setOrder } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [tpizzas,setTPizzas] = useState([]);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        let fetchData = async () => {
            try {
              setLoading(true)
              const getOrder = await axios.get(`${config.api}/order/${user._id}`);
              setOrder(getOrder.data);
              setLoading(false)
            } catch (error) {
              alert("could't get order");
            }
          };
        fetchData();
      }, []);

      let cancel = async(_id)=>{
        console.log(_id)
        try {
          await axios.put(`${config.api}/ordercansel/${_id}`);
          alert("Your order successfully cansel");
          navigate("/portal/base");
        } catch (error) {
          alert("Error for cansel to your order");
        }
      }

  
  return (
    <div className="container m-2 ">
       <Link className="btn btn-danger btn-sm m-3" to={"/portal/base"} >home</Link>
    <div className="row justify-content-start">
    {   order.map((orderItem,index) => {
        return(
    <div className="col-lg-4 p-4" key={index}>
    <div className="card p-3">
      <div className="card-body">
        <h1 className="text-center">Order {index+1}</h1><br></br>
        <ol className="list-group text-start">
          {orderItem.pizza.map((items,index2) => {
            return (
              <li
              key ={index2}
                className="
            list-group-item
            d-flex
            justify-content-between
            align-items-start
          "
              >
                <div className="ms-2 me-auto fw-bold">
                  <img src={items.image} style={{height:"30px",width:"30px"}}/>&nbsp;&nbsp;
                    
              
                </div>
                {items.pizza_name}&nbsp;&nbsp;
              </li>
            );
          })}
        </ol><br></br>
        <div className="row justify-content-between mt-3">
          <div className="col-6">
            <h6 className="fw-bold text-start">SUBTOTAL</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-end">{orderItem.sub_total}</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-start">TAX</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-end">{orderItem.tax}</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-start">TOTAL</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-end">{orderItem.total}</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-start">ORDER STATUS</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-end">{orderItem.order_status}</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-start">PAYMENT TYPE</h6>
          </div>
          <div className="col-6">
            <h6 className="fw-bold text-end">{orderItem.payment_type}</h6>
          </div>
          
        </div>
        <hr />
        <div className="row justify-content-center mt-3">
          <div className="col-12 text-center">
            <Link onClick ={ ()=>cancel(orderItem._id)} className="btn btn-success btn-sm">
              CANCEL
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
      })}
  </div>
  </div>
  );
}

export default OrderItems;
