import React, { useContext, useEffect, useState } from "react";
import { stockControl } from "../utils/stockControl";
import { UserContext } from "../utils/UserContext";

function PizzaCard(props) {
  const { pizzas } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(UserContext);
  const [price, setPrice] = useState({ size: "", price: "" });
  const [id, setId] = useState();

  const handleInputs = (e) => {
    let arr = e.target.value.split(",");
    setPrice((previousState) => {
      return { ...previousState, size: arr[0], price: arr[1] };
    });
  };

  let indexfind = (id) => {
    setId(id);
  };

  //add selected pizza to card item
  let addPizza = ({ _id, pizza_name, img, stock }, { size, price }, id) => {
    setCartItems([
      ...cartItems,
      {
        _id: _id,
        pizza_name: pizza_name,
        image: img,
        size: size,
        stock: stock - 1,
        quantity: 1,
        price: parseInt(price),
        orgPrice: parseInt(price),
        add_items: [
          { item_name: "Onion", item_price: "0", item_type: "veggies" },
        ],
      },
    ]);
    stockControl(id, -1);
  };

  return (
    <>
      {pizzas.map((Pizza, index) => {
        if (Pizza.pizza_type === props.type) {
          return (
            <div className="col-xl-4 col-lg-6" key={index}>
              <div className="p-3 border bg-light">
                <div className="card" style={{ height: "27rem auto" }}>
                  <img
                    src={Pizza.img}
                    className="card-img-top img-flex"
                    alt="Pizza"
                  />
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12" style={{ height: "6rem" }}>
                        <h5 className="card-title">{Pizza.pizza_name}</h5>
                        <p className="card-text text-start">{Pizza.about}</p>
                      </div>
                      <div className="col-12">
                        <hr />
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onClick={(e) => {
                            indexfind(Pizza._id);
                            handleInputs(e);
                          }}
                        >
                          <option name="small" value={["small", Pizza.small]}>
                            Small
                          </option>
                          <option
                            name="medium"
                            value={["medium", Pizza.medium]}
                          >
                            Medium
                          </option>
                          <option name="large" value={["large", Pizza.large]}>
                            Large
                          </option>
                          <option
                            name="extra_large"
                            value={["extra_large", Pizza.extra_large]}
                          >
                            Extra Large
                          </option>
                        </select>
                        <hr />
                      </div>
                      <div className="col-12 align-self-center">
                        {Pizza.stock !== 0 ? (
                          id === Pizza._id ? (
                            <button
                              onClick={() => {
                                addPizza(Pizza, price, Pizza._id);
                              }}
                              className="btn btn-success"
                            >
                              Add to Card &nbsp;&nbsp;&#8377;{price.price}
                            </button>
                          ) : (
                            <button className="btn btn-success" disabled>
                              select size
                            </button>
                          )
                        ) : (
                          <button className="btn btn-danger" disabled>
                            out of stock
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default PizzaCard;
