import React, { useContext } from "react";
import UserContext from "../UserContext/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Top from "./Top";

const OrderDetail = () => {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { orderDetailSingle } = context;
  if (orderDetailSingle.length === 0) {
    navigate("/order");
  }
  return (
    <>
      <Top />
      <h1>ORDER DETAIL</h1>
      {orderDetailSingle.map((element) => {
        return (
          <ul key={element._id}>
            <li>{element._id}</li>
            <li>
              <img
                src={require(`../upload/${element.image}`)}
                alt="img"
                width="100px"
                height="100px"
              />
            </li>
            <li>{element.title}</li>
            <li>{element.description}</li>
            <li>{element.price}</li>
          </ul>
        );
      })}
    </>
  );
};

export default OrderDetail;
