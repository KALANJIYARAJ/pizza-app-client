import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "..//node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPages/Login";
import CreateAccount from "./pages/LoginPages/CreateAccount";
import Forgot from "./pages/LoginPages/Forgot";
import ResetPassword from "./pages/LoginPages/ResetPassword";
import Profile from "./component/Profile";
import AddVeggiesMeat from "./pages/adminPages/VeggiesMeats/AddVeggiesMeat";
import Payment from "./component/Payment";
import CreateOrder from "./pages/adminPages/order/CreateOrder";
import OrderItems from "./component/OrderItems";
import PortalLayout from "./pages/clientPages/PortalLayout";
import Base from "./pages/clientPages/Base";
import Sauce from "./pages/clientPages/Sauce";
import Cheese from "./pages/clientPages/Cheese";
import Veggies from "./pages/clientPages/Veggies";
import Meat from "./pages/clientPages/Meat";

import AdminPortal from "./pages/adminPages/AdminPortal";
import ViewUser from "./pages/adminPages/user/ViewUser";
import EditUser from "./pages/adminPages/user/EditUser";
import ViewOrder from "./pages/adminPages/order/ViewOrder";
import EditOrder from "./pages/adminPages/order/EditOrder";
import CreatePizza from "./pages/adminPages/pizzas/CreatePizza";
import ViewPizza from "./pages/adminPages/pizzas/ViewPizza";
import EditPizza from "./pages/adminPages/pizzas/EditPizza";
import CreateVeggiesMeats from "./pages/adminPages/VeggiesMeats/CreateVeggiesMeats";
import ViewVM from "./pages/adminPages/VeggiesMeats/ViewVM";
import EditVM from "./pages/adminPages/VeggiesMeats/EditVM";
import Remove from "./pages/LoginPages/Remove";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/accout" element={<CreateAccount />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/reset/:userId" element={<ResetPassword />}></Route>
        <Route path="/logout" element={<Remove />}></Route>

        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/addvm/:index" element={<AddVeggiesMeat />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/createOrder" element={<CreateOrder />}></Route>
        <Route path="/orderitems" element={<OrderItems />}></Route>

        <Route path="/portal" element={<PortalLayout />}>
          <Route path="base" element={<Base />}></Route>
          <Route path="sauce" element={<Sauce />}></Route>
          <Route path="cheese" element={<Cheese />}></Route>
          <Route path="veggies" element={<Veggies />}></Route>
          <Route path="meat" element={<Meat />}></Route>
        </Route>
        <Route path="/admin" element={<AdminPortal />}>
          <Route path="viewuser" element={<ViewUser />}></Route>
          <Route path="edituser/:userid" element={<EditUser />}></Route>

          <Route path="vieworder" element={<ViewOrder />}></Route>
          <Route path="editorder/:orderid" element={<EditOrder />}></Route>

          <Route path="createpizza" element={<CreatePizza />}></Route>
          <Route path="viewpizza" element={<ViewPizza />}></Route>
          <Route path="editpizza/:pizzaid" element={<EditPizza />}></Route>

          <Route path="createvm" element={<CreateVeggiesMeats />}></Route>
          <Route path="viewvm" element={<ViewVM />}></Route>
          <Route path="editvm/:vmid" element={<EditVM />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
