import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../utils/config";
import { UserContext } from "../utils/UserContext";

function Payment() {
  const { user } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(UserContext);
  const { subTotal } = useContext(UserContext);
  const { tax } = useContext(UserContext);
  const { total } = useContext(UserContext);
  const { vmTotal } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      payment_type: "cash on delivery",
      order_status: "conform",
      pizza: "",
      sub_total: "",
      tax: "",
      total: "",
      payment_status: "nopaid",
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/order`, values);
        alert("your order conform successfully");
        formik.resetForm();
        setCartItems([]);
        navigate("/portal/base");
        console.log(values);
      } catch (error) {
        alert("Error");
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("user_id", user._id);
    formik.setFieldValue("name", user.name);
    formik.setFieldValue("email", user.email);
    formik.setFieldValue("phone", user.phone);
    formik.setFieldValue("address", user.address);
    formik.setFieldValue("tax", tax);
    formik.setFieldValue("total", total);
    formik.setFieldValue("sub_total", subTotal);
    formik.setFieldValue("pizza", cartItems);
  }, []);

  return (
    <div className="container text-center forcenter py-2">
      <div className="row justify-content-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="col-12">
            <div className="border p-2 m-2 ">
              <div className="row justify-content-center">
                <div className="col-lg-12 m-2 ">
                  <h6 className="m-1 ">Who's the order for?</h6>
                </div>
                <div className="col-lg-12 m-2 align-self-center text-start">
                  <div className="border border-primay p-2 m-2">
                    <div className="form-group">
                      <label className="text-start mb-2">Name</label>
                      <input
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        type={"text"}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="border border-primay p-2 m-2">
                    <div className="form-group">
                      <label className="text-start mb-2">Email</label>
                      <input
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        type={"text"}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="border border-primay p-2 m-2">
                    <div className="form-group">
                      <label className="text-start mb-2">Mobile</label>
                      <input
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        type={"text"}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="border border-primay p-2 m-2">
                    <div className="form-group">
                      <label className="text-start mb-2">Address</label>
                      <textarea
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        type={"text"}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-12">
            <div className="border p-2 m-2 ">
              <div className="row justify-content-center">
                <div className="col-lg-12 m-2 ">
                  <h6 className="m-2 "> How would you like to pay?</h6>
                </div>
                <div className="col-lg-12 m-2 align-self-center">
                  <div className="border p-2 m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="card"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>
                        <Link className="removeUnderLine text-black" to={""}>
                          CREDIT OR DEBIT CARD
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="border p-2 m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="upi"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>
                        <Link className="removeUnderLine text-black" to={""}>
                          UPI
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className="border p-2 m-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="cash"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>
                        <Link className="removeUnderLine text-black" to={""}>
                          CASH
                        </Link>
                      </label>
                    </div>
                  </div>
                  <span
                    onClick={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.payment_type}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-12">
            <div className="border p-2 m-2 ">
              <div className="row justify-content-center">
                <div className="col-lg-12 m-2 ">
                  <div className="form-group">
                    <input type={"submit"} className="btn btn-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
