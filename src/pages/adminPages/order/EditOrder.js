import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../utils/config";

function EditOrder() {
  const param = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      payment_status: "paid",
      order_status: "",
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/editorder/${param.orderid}`, values);
        alert("Success");
        formik.resetForm();
        navigate("/admin/vieworder");
      } catch (error) {
        alert("Error");
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      const getOrder = await axios.get(`${config.api}/orders/${param.orderid}`);

      formik.setFieldValue("payment_status", getOrder.data[0].payment_status);
      formik.setFieldValue("order_status", getOrder.data[0].order_status);
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="container forcenter">
      <div className="card m-2" style={{ maxWidth: "30rem" }}>
        <div class="card-body">
          <h1 className=" bg-danger p-4 text-white">Create Veggies$Meat</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <label>Payment Status</label>
                  <select
                    name="payment_status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.payment_status}
                    className="form-control"
                  >
                    <option>paid</option>
                    <option>nopaid</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <label>Order Status</label>
                  <select
                    name="order_status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.order_status}
                    className="form-control"
                  >
                    <option>conform</option>
                    <option>cansel</option>
                    <option>prepare</option>
                    <option>out_for_deivery</option>
                    <option>delivery</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <input type={"submit"} className="btn btn-danger" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
