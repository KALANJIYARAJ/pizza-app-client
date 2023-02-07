import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../utils/config";

function EditUser() {
  const param = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      phone: "",
      address: "",
      user_type: "",
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/edituser/${param.userid}`, values);
        alert("Success");
        formik.resetForm();
        navigate("/admin/viewuser");
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
      const getUser = await axios.get(`${config.api}/user/${param.userid}`);
      formik.setFieldValue("name", getUser.data[0].name);
      formik.setFieldValue("email", getUser.data[0].email);
      formik.setFieldValue("phone", getUser.data[0].phone);
      formik.setFieldValue("address", getUser.data[0].address);
    } catch (error) {
      alert("Error");
    }
  };
  return (
    <div className="container mt-5 forcenter">
      <div className="card m-3" style={{ maxWidth: "30rem" }}>
        <div class="card-body">
          <h1 className="text-center bg-danger p-4 text-white">Edit Create</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="row justify-content-start px-2">
              <div className="col-lg-12 g-3">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type={"text"}
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "error-box"
                        : ""
                    }
                  ${
                    formik.touched.name && !formik.errors.name
                      ? "succes-box"
                      : ""
                  }`}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <span style={{ color: "red" }}>{formik.errors.name}</span>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-12 g-3">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type={"text"}
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "error-box"
                        : ""
                    }
                  ${
                    formik.touched.email && !formik.errors.email
                      ? "succes-box"
                      : ""
                  }`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-12 g-3">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    type={"text"}
                    className={`form-control ${
                      formik.touched.phone && formik.errors.phone
                        ? "error-box"
                        : ""
                    }
                  ${
                    formik.touched.phone && !formik.errors.phone
                      ? "succes-box"
                      : ""
                  }`}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <span style={{ color: "red" }}>{formik.errors.phone}</span>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-12 g-3">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    className="form-control"
                  >
                    <option>male</option>
                    <option>female</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 g-3">
                <div className="form-group">
                  <label>Address</label>
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
              <div className="col-lg-12 g-3">
                <div className="form-group">
                  <label>User_Type</label>
                  <select
                    name="user_type"
                    onChange={formik.handleChange}
                    value={formik.values.user_type}
                    className="form-control"
                  >
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 g-3">
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

export default EditUser;
