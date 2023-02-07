import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../utils/config";

function ResetPassword() {
  const navigate = useNavigate();
  const param = useParams();

  console.log(param.userId);

  const formik = useFormik({
    initialValues: {
      password: "",
      password1: "",
      // password1: "",
    },

    validate: (values) => {
      let error = {};

      if (!values.password) {
        error.password = "Please Enter a valid password";
      }

      if (values.password && values.password.length !== 8) {
        error.password = "pasword must 8 characters";
      }

      if (!values.password1) {
        error.password1 = "Please Enter a valid password";
      }

      if (values.password1 && values.password1.length !== 8) {
        error.password1 = "pasword must 8 characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        console.log(formik.values);
        if (formik.values.password === formik.values.password1) {
          await axios.post(`${config.api}/reset/${param.userId}`, values);
          alert("Success");
          formik.resetForm();
          navigate("/");
        } else {
          alert("password doesn't same");
        }
      } catch (error) {
        alert("Error");
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
                  <h2 class="fw-bold mb-5 text-uppercase">reset password</h2>

                  <form onSubmit={formik.handleSubmit}>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Enter password..."
                        className={`form-control form-control-lg ${
                          formik.touched.password && formik.errors.password
                            ? "error-box"
                            : ""
                        }
                      ${
                        formik.touched.password && !formik.errors.password
                          ? "succes-box"
                          : ""
                      }`}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <span style={{ color: "white" }}>
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="password1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        values={formik.values.password1}
                        placeholder="Reenter password..."
                        className={`form-control form-control-lg ${
                          formik.touched.password1 && formik.errors.password1
                            ? "error-box"
                            : ""
                        }
                        ${
                          formik.touched.password1 && !formik.errors.password1
                            ? "succes-box"
                            : ""
                        }`}
                      />
                      {formik.touched.password1 && formik.errors.password1 ? (
                        <span style={{ color: "white" }}>
                          {formik.errors.password1}
                        </span>
                      ) : null}
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5 mt-4"
                      type="submit"
                    >
                      submit
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

export default ResetPassword;
