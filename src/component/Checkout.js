import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { config } from "../utils/config";
import { UserContext } from "../utils/UserContext";

function Checkout({ total }) {
  const { user } = useContext(UserContext);
  const { subTotal } = useContext(UserContext);
  const { tax } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(UserContext);
  const navigate = useNavigate();

  const tokenHandler = async (token) => {
    const values = {
      user_id: user._id,
      name: user.name,
      email: token.email,
      phone: user.phone,
      address: user.address,
      payment_type: "online payment",
      order_status: "conform",
      pizza: cartItems,
      sub_total: subTotal,
      tax: tax,
      total: total,
      payment_status: "paid",
    };

    try {
      await axios.post(`${config.api}/order`, values);
      alert("your order conform successfully");
      setCartItems([]);
      navigate("/portal/base");
    } catch (error) {
      alert("Error");
    }
  };
  return (
    <StripeCheckout
      amount={total * 100}
      shippingAddress
      token={tokenHandler}
      stripeKey="pk_test_51Mh4WMSALocLvJ0Nx0jCo41Wi2HFsnQdTjzN3lYEJpLWmJVura8rvXUYhEIhA7021idhgsMeHrPNpeDD5i4Sxl0T00mavyM4F4"
      currency="INR"
    >
      <button className="btn btn-success">Check Out</button>
    </StripeCheckout>
  );
}

export default Checkout;
