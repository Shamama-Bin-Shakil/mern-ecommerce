import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import Top from "./Top";

const AddToCard = () => {
  let num = 1;
  const context = useContext(UserContext);
  const { item, onDelete, increment, decrement, totalItem, totalAmount } =
    context;
  return (
    <div>
      <Top />

      <section className="wrapper">
        <main>
          <div className="heading">
            <h1>Add To Card Product: {item.length}</h1>
          </div>
          <div className="frontCardPage">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {item.map((element) => {
                  return (
                    <tr key={element._id}>
                      <td>{num++}</td>
                      <td>
                        <img src={require("../upload/" + element.image)} alt="not-support" width="60px" height="60px" />
                      </td>
                      <td>{element.title}</td>
                      <td>{element.price}</td>
                      <td>
                        <button onClick={() => decrement(element._id)}>
                          -
                        </button>
                        {element.quantity}
                        <button onClick={() => increment(element._id)}>
                          +
                        </button>
                      </td>
                      <td>
                        <button onClick={() => onDelete(element._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="checksum">
              <Link to="/checkout">
                <button className="btn btn-primary">Checkout</button>
              </Link>
              <p>
                Total Amount: $<span>{totalAmount}</span>
              </p>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default AddToCard;
