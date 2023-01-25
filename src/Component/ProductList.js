import React, { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
const ProductList = () => {
  const context = useContext(UserContext);
  const { getData, product, productDetail, addToCard } = context;

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <section className="wrapper">
        <main>
          <div className="heading">
            <h1>Popular Products</h1>
          </div>
          <div className="frontCardSection">
            {product.map((element) => {
              return (
                <div className="cardItem" key={element._id}>
                  <div className="img">
                    <img src={require("../upload/" + element.image)} alt="" />
                  </div>
                  <div className="detail">
                    <h3>{element.title}</h3>
                    <p>
                      Price: $<span>{element.price}</span>
                    </p>
                    <Link to={`/productdetail/${element._id}`}>
                      <button
                        type="button"
                        className="buyNowBtn"
                        onClick={() => productDetail(element._id)}
                      >
                        Buy Now
                      </button>
                    </Link>
                    <button type="button" className="buyNowBtn" onClick={() => addToCard(element)}>
                      Add Card
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};

export default ProductList;
