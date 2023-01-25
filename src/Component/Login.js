import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Top from "./Top";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogin((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const LoginHandle = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_HOST}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: login.email, password: login.password }),
    })
    const result = await response.json();
    if(result.status === "success") {
      alert(result.msg);
      localStorage.setItem("auth", result.data);
      navigate("/")
    }
  };

  return (
    <div>
      <Top />
      <section className="wrapper">
        <main>
          <div className="frontAuthSection">
            <div className="auth-form">
              <form onSubmit={LoginHandle} autoComplete="off">
                <h1>Login Now</h1>
                <input
                  type="email"
                  onChange={handleOnChange}
                  name="email"
                  value={login.email}
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={handleOnChange}
                  name="password"
                  value={login.password}
                  placeholder="Password"
                />
                <button className="btn btn-primary">Login</button>
                <br />
                <a href="forget_password.html">Forget Password?</a>
                <br />
                <hr />
                <br />
                <Link to="/sign">
                  <span>No Account? Sign</span>
                </Link>
              </form>
              <div className="right-side">
                <h3>Your Are Login And Enjoy Journey For Products</h3>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Login;
