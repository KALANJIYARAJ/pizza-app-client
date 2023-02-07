import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function Profile() {

  const { user, setUser } = useContext(UserContext);
 console.log(user.gender)
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  {
                  user.gender=="female" ?
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />:
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                }
                  <h4>{user.name}</h4>
                  
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{user.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">{user.phone}</p>
                      </div>
                    </div>
                    <h6>Address:</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-8 mb-3">
                        <p className="text-muted">{user.address}.</p>
                      </div>
                      <div className="col-4 mb-3">
                      <Link className="btn btn-danger btn-sm" to={"/portal/base"}>Back</Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                     
                    </div>
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

export default Profile;
