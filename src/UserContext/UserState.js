import React, { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import reducer from "./cardReducer";
import UserContext from "./UserContext";
const UserState = (props) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderDetailSingle, setOrderDetailSingle] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const initialState = {
    item: [],
    totalAmount: 0,
    totalItem: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add To Card
  const addToCard = (element) => {
    return dispatch({
      type: "ADD_TO_CARD",
      payload: element,
    });
  };

  const onDelete = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  const clearCard = () => {
    return dispatch({
      type: "CLEAR_CARD",
    });
  };

  // Get Total
  useEffect(() => {
    return dispatch({ type: "GET_TOTAL" });
  }, [state.item]);

  // Get Product
  const getData = async () => {
    const url = `${process.env.REACT_APP_HOST}/api/products/get`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setProduct(result.data);
  };

  // Get Product Detail
  const productDetail = async (id) => {
    const url = `${process.env.REACT_APP_HOST}/api/products/getsingle/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setSingleProduct(result.data);
  };

  // CheckoutBtn
  const CheckoutBtn = async (formData) => {
    const url = `${process.env.REACT_APP_HOST}/api/order/create`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.status === "success") {
      clearCard();
    }
  };

  const orderDetail = async () => {
    const url = `${process.env.REACT_APP_HOST}/api/order/get`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth"),
      },
    });
    const result = await response.json();
    setOrder(result.result);
  };

  const orderSpecific = async (id) => {
    const url = `${process.env.REACT_APP_HOST}/api/order/getsingle/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setOrderDetailSingle(result.result.order);
  };

  const fetchUserDetail = async () => {
    const url = `${process.env.REACT_APP_HOST}/api/auth/userfetch`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth"),
      },
    });
    const result = await response.json();
    setUserDetail(result.data);
  };

  // Check User Login
  const userLogin = () => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          getData,
          product,
          productDetail,
          singleProduct,
          ...state,
          addToCard,
          onDelete,
          increment,
          decrement,
          clearCard,
          CheckoutBtn,
          orderDetail,
          order,
          orderSpecific,
          orderDetailSingle,
          userDetail,
          fetchUserDetail,
          userLogin,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
