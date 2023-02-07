import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../utils/config";

function CreateVeggiesMeats() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      item_name: "",
      item_icon_name: "",
      item_price: "",
      item_type: "veggies",
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/veggies_meats`, values);
        alert("Success");
        formik.resetForm();
        navigate("/admin/viewvm");
      } catch (error) {
        alert("Error");
      }
    },
  });
  return (
    <div className="container forcenter">
      <div className="card m-2" style={{ maxWidth: "30rem" }}>
        <div class="card-body">
          <h1 className=" bg-danger p-4 text-white">Create Veggies$Meat</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    name="item_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.item_name}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <label>Icon Name</label>
                  <input
                    name="item_icon_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.item_icon_name}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <label>Item Price</label>
                  <input
                    name="item_price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.item_price}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 m-2">
                <div className="form-group">
                  <label>Item Type</label>
                  <select
                    name="item_type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.item_type}
                    className="form-control"
                  >
                    <option>veggies</option>
                    <option>meat</option>
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

export default CreateVeggiesMeats;
