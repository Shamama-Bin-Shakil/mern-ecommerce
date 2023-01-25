import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import Top from "./Top";

const Order = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { orderDetail, order, orderSpecific } = context;
  useEffect(() => {
    orderDetail();
     // eslint-disable-next-line
  }, []);
  
  if (order.length === 0) {
    navigate("/");
  }

  return (
    <div>
      <Top />
      <section className="wrapper">
        <main>
          <div className="heading">
            <h1>Order Product</h1>
          </div>
          <div className="frontCardPage">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Street</th>
                  <th>City</th>
                  <th>Zip Code</th>
                  <th>Payment Type</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {order.map((element) => {
                  return (
                    <tr key={element._id}>
                      <td>{element._id}</td>
                      <td>{element.street}</td>
                      <td>{element.city}</td>
                      <td>{element.zipcode}</td>
                      <td>{element.payment_type}</td>
                      <td>
                        <Link to="/orderDetail">
                          <span onClick={() => orderSpecific(element._id)}>
                            Detail
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="checksum">
              <Link to="/">
                <button className="btn btn-primary">Shopping Now</button>
              </Link>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Order;
