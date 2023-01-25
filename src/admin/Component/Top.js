import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import AdminContext from "../AdminContext/AdminContext";
const Top = () => {
  let num = 1;
  const context = useContext(AdminContext);
  const { getData, product } = context;
  const [form, setForm] = useState({
    title: "",
    price: "",
    mrp: "",
    quantity: "",
    date: "",
    description: "",
  });

  const [img, setImg] = useState("");

  const ref = useRef();
  const openModel = () => {
    ref.current.classList.add("active");
  };
  const closeModel = () => {
    ref.current.classList.remove("active");
  };
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setForm((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const formHandle = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("mrp", form.mrp);
    formData.append("quantity", form.quantity);
    formData.append("date", form.date);
    formData.append("description", form.description);
    formData.append("file", img);

    const url = `${process.env.REACT_APP_HOST}/backend/api/products/create`;
    
    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    const result = await response.json();
    console.log(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <section id="sidebar">
        <a className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">My Store</span>
            </a>
          </li>
          <li>
            <a>
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Analytics</span>
            </a>
          </li>
          <li>
            <a>
              <i className="bx bxs-message-dots"></i>
              <span className="text">Message</span>
            </a>
          </li>
          <li>
            <a>
              <i className="bx bxs-group"></i>
              <span className="text">Team</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a>
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* <!-- SIDEBAR --> */}

      {/* <!-- CONTENT --> */}
      <section id="content">
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu"></i>
          <a className="nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </a>
          <a className="profile">
            <img src="img/people.png" />
          </a>
        </nav>
        {/* <!-- NAVBAR --> */}

        {/* <!-- MAIN --> */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <button onClick={() => openModel()}>Add Product</button>
                <i className="bx bx-cart-add"></i>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>M.R.P</th>
                    <th>Quantity</th>
                    <th>Delivery Type</th>
                    <th>Operation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((element) => {
                    return (
                      <tr key={element._id}>
                        <td>{num++}</td>
                        <td>
                          <p>{element.title}</p>
                        </td>
                        <td>
                          <img src={require("../../upload/" + element.image)} />
                        </td>
                        <td>
                          <p>{element.price}</p>
                        </td>
                        <td>
                          <p>{element.mrp}</p>
                        </td>
                        <td>
                          <p>{element.quantity}</p>
                        </td>
                        <td>
                          <p>Free Delivery</p>
                        </td>
                        <td>{element.date}</td>
                        <td>
                          <span className="status process">Active</span>
                          <span className="status completed">Update</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        {/* <!-- MAIN --> */}
      </section>

      {/* <!-- MODEL --> */}
      <div id="model-layout" ref={ref}>
        <div className="model">
          <div className="model-header">
            <h2>Add Product</h2>
            <div className="close" onClick={() => closeModel()}>
              +
            </div>
          </div>
          <div className="model-main">
            <form className="content">
              <input
                type="text"
                placeholder="Title"
                onChange={handleOnChange}
                name="title"
                value={form.title}
              />
              <input
                type="text"
                placeholder="Price"
                onChange={handleOnChange}
                name="price"
                value={form.price}
              />
              <input
                type="text"
                placeholder="M.R.P"
                onChange={handleOnChange}
                name="mrp"
                value={form.mrp}
              />
              <input
                type="text"
                placeholder="Quantity"
                onChange={handleOnChange}
                name="quantity"
                value={form.quantity}
              />
              <input
                type="date"
                placeholder="Date"
                onChange={handleOnChange}
                name="date"
                value={form.date}
              />
              <select name="status" id="">
                <option value="Free Delivery">Free Delivery</option>
                <option value="Not Free Delivery">Not Free Delivery</option>
              </select>
              <textarea
                placeholder="Description Typing...."
                onChange={handleOnChange}
                name="description"
                value={form.description}
              ></textarea>
              <input
                type="file"
                onChange={(event) => setImg(event.target.files[0])}
              />
            </form>
          </div>
          <div className="model-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={formHandle}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
