import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import Top from "./Top";

const Checkout = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const {
    item,
    onDelete,
    totalAmount,
    CheckoutBtn,
    userDetail,
    userLogin,
    fetchUserDetail,
  } = context;
  const [checkout, setCheckout] = useState({
    user_id: userDetail._id,
    street: "",
    city: "",
    zipcode: "",
    order: item,
    payment_type: "",
  });

  // Check User Login
  useEffect(() => {
    userLogin();
    fetchUserDetail();
    // eslint-disable-next-line 
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCheckout((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  if (item.length === 0) {
    navigate("/login");
  }

  return (
    <>
      {/* Check Condition Item Empty Redirect */}
      {item.length === 0 && <Navigate to="/order" replace={true} />}

      <Top />
      <section className="wrapper">
        <main>
          <div className="heading">
            <h1>Checkout Product</h1>
          </div>
          <div className="frontCheckoutPage">
            <div className="checkout-left">
              {/* <!-- User Auth --> */}
              {/* <!-- <div className="auth-form">
              <form action="" autoComplete="off">
                <h1>Login Now</h1>
                <input type="email" className="" placeholder="Email" />
                <input type="password" className="" placeholder="Password" />
                <button className="btn btn-primary">Login</button>
                <br />
                <br />
                <a href="forget_password.html">Forget Password?</a>
                <br />
                <br />
                <hr />
                <br />
                <a href="sign.html">No Account? Sign</a>
              </form>
            </div> --> */}

              {/* <!-- User Address --> */}
              <div className="user-address">
                <form autoComplete="off">
                  <h1>Address Information</h1>
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="street"
                    value={checkout.street}
                    placeholder="Street Address"
                    required
                  />
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="city"
                    value={checkout.city}
                    placeholder="City / State"
                    required
                  />
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="zipcode"
                    value={checkout.zipcode}
                    placeholder="Post code / zip"
                    required
                  />

                  <h1>Payment Information</h1>
                  <div className="paymentMethod">
                    <label htmlFor="card">
                      <span>Credit card </span>
                      <input
                        type="radio"
                        name="payment_type"
                        value="card"
                        onChange={handleOnChange}
                        className="radio"
                        id="card"
                        requried
                      />
                    </label>
                    <label htmlFor="cod">
                      <span>COD (Cash Out Delivery) </span>
                      <input
                        type="radio"
                        name="payment_type"
                        value="cod"
                        onChange={handleOnChange}
                        className="radio"
                        id="cod"
                        requried
                      />
                    </label>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => CheckoutBtn(checkout)}
                  >
                    Checkout
                  </button>
                </form>
              </div>
            </div>

            <div className="checkout-right">
              <h2>Your Order</h2>
              <hr />
              {item.map((element) => {
                return (
                  <div className="order-item" key={element._id}>
                    <div className="item">
                      <img
                        src={require("../upload/" + element.image)}
                        alt="support"
                        width="100px"
                        height="100px"
                      />
                      <div className="detail">
                        <h4>{element.title}</h4>
                        <p>Price: ${element.price}</p>
                      </div>
                    </div>
                    <div
                      className="operation"
                      onClick={() => onDelete(element._id)}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </div>
                  </div>
                );
              })}
              <hr />
              <div className="sub-total">
                <h3>Sub Total:</h3>
                <p>
                  $<span>{totalAmount}</span>
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default Checkout;
