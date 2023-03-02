import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
import Topbar from "../../component/Topbar";
import Footer from "../../component/Footer";
import { UserContext } from "../../utils/UserContext";
import { stockControl } from "../../utils/stockControl";
import Checkout from "../../component/Checkout";

function PortalLayout() {
  const { setUser } = useContext(UserContext);
  const { setPizzas } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(UserContext);
  const { subTotal, setSubTotal } = useContext(UserContext);
  const { tax, setTax } = useContext(UserContext);
  const { total, setTotal } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    getUser();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const getPizzas = await axios.get(`${config.api}/pizzas`);
      setPizzas(getPizzas.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  const getUser = async () => {
    try {
      const getUser = await axios.get(`${config.api}/user/${user_id}`, {
        headers: {
          Authorization: localStorage.getItem("pizza-app"),
        },
      });
      setUser(getUser.data[0]);
    } catch (error) {
      alert("Error");
      navigate("/logout");
    }
  };

  const updateQuantity = (
    index,
    whichvalue,
    newvalue,
    whichvalue2,
    newvalue2,
    id,
    num
  ) => {
    if (newvalue !== 0) {
      let temporaryarray = cartItems.slice();
      temporaryarray[index][whichvalue] = newvalue;
      temporaryarray[index][whichvalue2] = newvalue2;
      setCartItems(temporaryarray);
      console.log(id);
      stockControl(id, num);
    }
  };

  let removeFromCart = (indexVal, id, quantity) => {
    cartItems.splice(indexVal, 1);
    setCartItems([...cartItems]);
    stockControl(id, quantity);
  };

  let itemprice = 0;

  return (
    <div className="container-fluid">
      <Topbar />
      <div className="container-fluid text-center m-2">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="container text-center">
              <div className="row justify-content-start g-2">
                {loading ? (
                  <div className="">
                    <br />
                    <br />
                    <br />
                    <br />
                    <div
                      class="spinner-border text-danger justify-content-center forcenter1"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Outlet />
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-3 p-2 mt-2">
            <div className="card">
              <div className="card-body">
                <h1>Welcome</h1>
                <ol className="list-group text-start">
                  {cartItems.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-start
                  "
                      >
                        <div className="ms-2 me-auto">
                          <Link
                            className="fw-bold removeUnderLine hover"
                            to={`/addvm/${index}`}
                          >
                            {item.pizza_name}
                          </Link>
                          <span className="text-white">
                            &nbsp;&nbsp;{" "}
                            {
                              (itemprice =
                                itemprice +
                                item.add_items.reduce((prev, curr) => {
                                  return (prev =
                                    parseInt(prev) + parseInt(curr.item_price));
                                }, 0))
                            }
                          </span>

                          <br />
                          <div>
                            {" "}
                            add_items:
                            {item.add_items.map((aitem, index) => {
                              return <span>&nbsp;{aitem.item_name}</span>;
                            })}
                            .
                          </div>
                        </div>
                        <div className="justify-content-center">
                          <button
                            className="badge bg-black rounded-pill p-2 me-2"
                            onClick={() =>
                              updateQuantity(
                                index,
                                "quantity",
                                item.quantity + 1,
                                "price",
                                item.price + item.orgPrice,
                                item._id,
                                -1
                              )
                            }
                          >
                            +
                          </button>
                          <span className="me-2">{item.quantity}</span>
                          <button
                            className="badge bg-black rounded-pill p-2 me-2"
                            onClick={() =>
                              updateQuantity(
                                index,
                                "quantity",
                                item.quantity - 1,
                                "price",
                                item.price - item.orgPrice,
                                item._id,
                                1
                              )
                            }
                          >
                            -
                          </button>
                          {item.price}&nbsp;&nbsp;
                          <button
                            onClick={() => {
                              removeFromCart(index, item._id, item.quantity);
                            }}
                            className="badge bg-black rounded-pill p-2 my-2"
                          >
                            x
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
                <div className="row justify-content-between mt-3">
                  <div className="col-6">
                    <h6 className="fw-bold text-start">SUBTOTAL</h6>
                  </div>
                  <div className="col-6">
                    {setSubTotal(
                      itemprice +
                        cartItems.reduce((prev, curr) => {
                          return (prev = parseInt(prev) + parseInt(curr.price));
                        }, 0)
                    )}
                    <h6 className="fw-bold text-end">{subTotal}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="fw-bold text-start">TAX</h6>
                  </div>
                  {setTax((subTotal * 5) / 100)}
                  <div className="col-6">
                    <h6 className="fw-bold text-end">{tax}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="fw-bold text-start">TOTAL</h6>
                  </div>
                  {setTotal(subTotal + tax)}
                  <div className="col-6">
                    <h6 className="fw-bold text-end">{total}</h6>
                  </div>
                </div>
                <hr />
                <div className="row justify-content-center mt-3">
                  <div className="col-12">
                    {/* <Link className="btn btn-success btn-sm" to={"/payment"}>
                      ORDER {total}
                    </Link> */}
                    <Checkout total={total} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br /> <br />
      <Footer />
    </div>
  );
}

export default PortalLayout;
