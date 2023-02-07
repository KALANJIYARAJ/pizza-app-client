import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../utils/config";

function EditPizza() {
  const param = useParams();
  const [pizza, setPizza] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      pizza_name: "",
      img: "",
      about: "",
      small: "",
      medium: "",
      large: "",
      extra_large: "",
      price: "",
      stock: 0,
      pizza_type: "base",
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/editpizza/${param.pizzaid}`, values);
        alert("Success");
        formik.resetForm();
        navigate("/admin/viewpizza");
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
      const getPizza = await axios.get(`${config.api}/pizza/${param.pizzaid}`);
      setPizza(getPizza.data[0]);
      formik.setFieldValue("pizza_name", getPizza.data[0].pizza_name);
      formik.setFieldValue("img", getPizza.data[0].img);
      formik.setFieldValue("about", getPizza.data[0].about);
      formik.setFieldValue("small", getPizza.data[0].small);
      formik.setFieldValue("medium", getPizza.data[0].medium);
      formik.setFieldValue("large", getPizza.data[0].large);
      formik.setFieldValue("extra_large", getPizza.data[0].extra_large);
      formik.setFieldValue("price", getPizza.data[0].price);
      formik.setFieldValue("stock", getPizza.data[0].stock);
      formik.setFieldValue("pizza_type", getPizza.data[0].pizza_type);
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="container forcenter">
      <div className="card m-2" style={{ maxWidth: "30rem" }}>
        <div class="card-body">
          <h1 className=" bg-danger p-4 text-white">Edit Pizza</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>PizzaName</label>
                  <input
                    name="pizza_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pizza_name}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>Image</label>
                  <input
                    name="img"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.img}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>About</label>
                  <input
                    name="about"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.about}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>small</label>
                  <input
                    name="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.small}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>medium</label>
                  <input
                    name="medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.medium}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>large</label>
                  <input
                    name="large"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.large}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>extra_large</label>
                  <input
                    name="extra_large"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.extra_large}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    type={"text"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    name="stock"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stock}
                    type={"number"}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-2">
                <div className="form-group">
                  <label>Pizza_Type</label>
                  <select
                    name="pizza_type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pizza_type}
                    className="form-control"
                  >
                    <option>base</option>
                    <option>sauce</option>
                    <option>cheese</option>
                    <option>veggies</option>
                    <option>meat</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 mt-2">
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

export default EditPizza;
