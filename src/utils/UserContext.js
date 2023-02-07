import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const [tax, setTax] = useState([]);
  const [total, setTotal] = useState([]);
  const [vmTotal, setVmTotal] = useState(0);
  const [cartVM, setCartVM] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  return (
    <UserContext.Provider
      value={{
        pizzas,
        setPizzas,
        cartItems,
        setCartItems,
        total,
        setTotal,
        subTotal,
        setSubTotal,
        tax,
        setTax,
        vmTotal,
        setVmTotal,
        cartVM,
        setCartVM,
        items,
        setItems,
        user,
        setUser,
        order, setOrder
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
