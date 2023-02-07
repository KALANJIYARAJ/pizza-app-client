import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

function AdminNav() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState({
    expanded: "false",
    collapsed: "navbar-toggler text-white",
    show: "navbar-collapse collapse",
  });

  let hide = () => {
    setShow({
      expanded: "false",
      collapsed: "navbar-toggler text-white",
      show: "navbar-collapse collapse",
    });
  };

  let checkHide = () => {
    if (show.expanded === "true") {
      setShow({
        expanded: "false",
        collapsed: "navbar-toggler text-white",
        show: "navbar-collapse collapse",
      });
    } else {
      setShow({
        expanded: "true",
        collapsed: "navbar-toggler text-white collapsed",
        show: "navbar-collapse collapse show",
      });
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white" to={"base"}>
            Tasty Pizza
          </Link>
          <button
            className={show.collapsed}
            type="button"
            onClick={() => {
              checkHide();
            }}
            aria-controls="navbarSupportedContent"
            aria-expanded={show.expanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={show.show} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to={"viewuser"}
                  onClick={() => {
                    hide();
                  }}
                >
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"vieworder"}
                  onClick={() => {
                    hide();
                  }}
                >
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"viewpizza"}
                  onClick={() => {
                    hide();
                  }}
                >
                  Pizza
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"viewvm"}
                  onClick={() => {
                    hide();
                  }}
                >
                  Veggies&Meat
                </Link>
              </li>
            </ul>
            <Link className="nav-link text-white me-3" to={"/profile"}>
              {user.name}
            </Link>
            <Link className="nav-link text-white me-3" to={"/logout"}>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNav;

{
  /* <div className={show.show} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"viewuser "}
                  onClick={() => {
                    hide();
                  }}
                >
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"vieworder"}
                  onClick={() => {
                    hide();
                  }}
                >
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"viewpizza"}
                  onClick={() => {
                    hide();
                  }}
                >
                  Pizza
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to={"viewvm"}
                  onClick={() => {
                    hide();
                  }}
                >
                  Veggies&Meats
                </Link>
              </li>
            </ul>
            <Link className="nav-link text-white fw-bold">{user.name}</Link>
            <Link className="nav-link text-white" to={"/"}>
              Logout
            </Link>
          </div> */
}
