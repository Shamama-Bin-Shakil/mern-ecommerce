/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useContext } from "react";
import Top from "./Top";
import UserContext from "../UserContext/UserContext";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
const ProductDetail = () => {
  const product_id = useParams();

  const context = useContext(UserContext);
  const { productDetail, singleProduct, addToCard } = context;

  useEffect(() => {
    productDetail(product_id.id);
     // eslint-disable-next-line 
  }, [product_id.id]);

  return (
    <div>
      <Top />
      <section className="wrapper">
        <main>
          <div className="frontProductDetailSection">
            <div className="product-img">
              <img src={require(`../upload/1674297180716-283518780-Screenshot (1).png`)} alt="product-image" width="60px" height="60px" />
            </div>
            <div className="product-detail">
              <h3>{singleProduct.title}</h3>
              <div>
                <div className="rate">
                  ${singleProduct.price}
                  <span className="save-Rs">&nbsp;Save (-22%)</span>
                </div>
                <div className="mrp">M.R.P: ${singleProduct.mrp}</div>
                <div className="delivery">Free Delivery</div>
                <div className="">
                  Available: <span className="color-normal">In Stock</span>
                </div>
                <div>
                  <p>
                    <span>Qty:</span>
                    <select name="" id="qty">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </p>
                </div>
                <h4>Description</h4>
                <p>{singleProduct.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCard(singleProduct)}
                >
                  Add to Cart
                </button>
                <button className="btn btn-primary">
                  <Link exact to="/addtocard">
                    Buy Now
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ProductDetail;
