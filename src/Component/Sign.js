import React, { useState } from "react";
import { Link } from "react-router-dom";
import Top from "./Top";

const Login = () => {
  const options = [
    { value: "Male", text: "Male" },
    { value: "Female", text: "Female" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
    birth_date: "",
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

  const SignHandle = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_HOST}/api/auth/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: login.name,
        email: login.email,
        password: login.password,
        gender: selected,
        birth_date: login.birth_date,
      }),
    });
    const result = await response.json();
    alert(result.msg)
  };
  return (
    <div>
      <Top />
      <section className="wrapper">
        <main>
          <div className="frontAuthSection">
            <div className="auth-form">
              <form onSubmit={SignHandle} autoComplete="off">
                <h1>Create New Account</h1>
                <input
                  type="text"
                  onChange={handleOnChange}
                  name="name"
                  value={login.name}
                  placeholder="Username"
                />
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
                <input type="password" placeholder="Confirm Password" />

                <select onChange={handleChange} value={selected}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  onChange={handleOnChange}
                  name="birth_date"
                  value={login.birth_date}
                  placeholder="Birth Of Date"
                />
                <button className="btn btn-primary">Register</button>
                <br />
                <Link to="/login">
                  <span>Already Account? Login</span>
                </Link>
              </form>
              <div className="right-side sign-side">
                <a href="" className="custome-btn">
                  <ion-icon name="logo-facebook"></ion-icon>
                  <span>Facebook Account</span>
                </a>
                <a href="" className="custome-btn">
                  <ion-icon name="logo-google"></ion-icon>
                  <span>Google Account</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Login;
