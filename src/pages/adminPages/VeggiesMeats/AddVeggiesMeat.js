import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { config } from "../../../utils/config";
import { UserContext } from "../../../utils/UserContext";

function AddVeggiesMeat() {
  const { items, setItems } = useContext(UserContext);
  const { cartVM, setCartVM } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const param = useParams();

  useEffect(() => {
    fetchItems();
    setCartVM(cartItems[param.index].add_items);
  }, []);

  let fetchItems = async () => {
    try {
      setLoading(true);
      const getItems = await axios.get(`${config.api}/veggies_meats`);
      setItems(getItems.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  let addItem = async (item) => {
    setCartVM([...cartVM, item]);
  };

  let removeItem = (item, indexVal) => {
    //   const indexVal = cartVM.findIndex((obj) => obj._id === item._id);
    cartVM.splice(indexVal, 1);
    setCartVM([...cartVM]);
  };

  const updateAddItems = (index, whichvalue, newvalue) => {
    if (index !== -1) {
      let temporaryarray = cartItems.slice();
      temporaryarray[index][whichvalue] = newvalue;
      setCartItems(temporaryarray);
    } else {
      alert("no match");
    }
  };

  let total;
  return (
    <div className="container fluid forcenter py-5">
      {loading === false ? (
        <div className="card">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <img
                src="https://i.pinimg.com/736x/eb/44/6e/eb446e8756d534e49b9ce9bec2f1aa62.jpg"
                className="img-fluid"
                alt="..."
              />
            </div>
            <div className="col-lg-6">
              <div className="card-body">
                <br />
                <h1 className="card-title">Pizza Name</h1>
                <br />
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <br />
                <div className="overflow-auto" style={{ height: "580px" }}>
                  <div className="p-3 bg-dark text-white bg-opacity-2 border  border-start-0">
                    Change your toppings
                  </div>
                  <ul className="list-group">
                    {cartVM.map((item, index) => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.item_name}</div>
                          </div>
                          <div className="">
                            &#8377;{item.item_price}&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                          <button
                            key={index}
                            onClick={() => {
                              removeItem(item, index);
                            }}
                            className="badge bg-dark rounded-pill"
                          >
                            X
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="p-3 bg-dark text-white bg-opacity-2 border  border-start-0 mt-3">
                    Add something extra
                  </div>
                  <ul className="list-group">
                    {items.map((item) => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.item_name}</div>
                          </div>
                          <div className="">
                            &#8377;{item.item_price}&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                          <button
                            onClick={() => {
                              addItem(item);
                            }}
                            className="badge bg-dark rounded-pill"
                          >
                            +
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <br />
                <Link
                  onClick={() => {
                    updateAddItems(param.index, "add_items", cartVM);
                  }}
                  className="btn btn-danger mt-3"
                  to={"/portal/base"}
                >
                  Add Veggies &nbsp; &#8377; {total}
                  {
                    (total = cartVM.reduce((prev, curr) => {
                      return (prev =
                        parseInt(prev) + parseInt(curr.item_price));
                    }, 0))
                  }
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="spinner-border text-danger justify-content-center forcenter1"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default AddVeggiesMeat;
