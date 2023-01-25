import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./Index";
import Login from "./Login";
import Sign from "./Sign";
import AddToCard from "./AddToCard";
import Checkout from "./Checkout";
import Order from "./Order";
import ProductDetail from "./ProductDetail";
import OrderDetail from "./OrderDetail";
import UserProfile from "./UserProfile";
import UserProfilePassword from "./UserProfilePassword";
const Root = () => {
  return (
    <div>
      <Routes>
        <Route exact={true} path="/" element={<Index />} />
        <Route exact={true} path="/login" element={<Login />} />
        <Route exact={true} path="/sign" element={<Sign />} />
        <Route exact={true} path="/addtocard" element={<AddToCard />} />
        <Route exact={true} path="/checkout" element={<Checkout />} />
        <Route exact={true} path="/order" element={<Order />} />
        <Route exact={true} path="/productdetail/:id" element={<ProductDetail />} />
        <Route exact={true} path="/orderdetail" element={<OrderDetail />} />
        <Route exact={true} path="/userprofile" element={<UserProfile />} />
        <Route exact={true} path="/userprofilepassword" element={<UserProfilePassword />} />
      </Routes>
    </div>
  );
};
export default Root;
