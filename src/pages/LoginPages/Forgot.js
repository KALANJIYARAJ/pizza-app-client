import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";

function Forgot() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validate: (values) => {
      let error = {};
      if (!values.email) {
        error.email = "Please Enter a email";
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        error.email = "Please enter a valid email";
      }
      return error;
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/forgot`, values);
        alert("Check your email");
        formik.resetForm();
        navigate("/");
      } catch (error) {
        alert("incorrect username");
      }
    },
  });
  return (
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              class="card bg-danger text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4">
                  <h2 class="fw-bold mb-2 text-uppercase">Forgot</h2>
                  <p class="text-white-50 mb-5">
                    Please enter your login email id
                  </p>

                  <form onSubmit={formik.handleSubmit}>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="Enter Email Address..."
                        className={`form-control form-control-lg ${
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
                        <span style={{ color: "white" }}>
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>
                    <button
                      class="btn btn-outline-light btn-lg px-5 mt-3 "
                      type="submit"
                    >
                      Forgot
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgot;
