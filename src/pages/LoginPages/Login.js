import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
import { UserContext } from "../../utils/UserContext";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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

      if (!values.password) {
        error.password = "Please Enter Password";
      }

      if (values.password && values.password.length < 8) {
        error.password = "Your password must be above 8 characters";
      }

      return error;
    },

    onSubmit: async (values) => {
      try {
        const user1 = await axios.post(`${config.api}/login`, values);

        if (user1.data.user.user_type === "admin") {
          localStorage.setItem("pizza-app", user1.data.token);
          localStorage.setItem("user", user1.data.user._id);
          navigate("/admin/vieworder");
        } else if (user1.data.user.user_type === "user") {
          localStorage.setItem("pizza-app", user1.data.token);
          localStorage.setItem("user", user1.data.user._id);
          navigate("/portal/base");
        } else {
          alert("incorrect username/password");
        }
      } catch (error) {
        alert("incorrect username/password");
      }
    },
  });

  return (
    <section class="vh-100">
      <div class="container py-5 vh-100">
        <div class="row d-flex justify-content-center align-items-center vh-100">
          <div class="col-10 col-md-8 col-lg-6 col-xl-5">
            <div
              class="card bg-danger text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-5">
                    Please enter your login and password!
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

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        values={formik.values.password}
                        placeholder="Password"
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

                    <p class="small mb-5 pb-lg-2">
                      <Link class="text-white-50" to={"/forgot"}>
                        Forgot password?
                      </Link>
                    </p>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>

                  <div>
                    <p class="mt-5">
                      Don't have an account?{" "}
                      <Link to={"/accout"} class="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
