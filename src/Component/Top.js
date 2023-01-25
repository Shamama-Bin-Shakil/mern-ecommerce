import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";

const Top = () => {
  const context = useContext(UserContext);
  const { item, fetchUserDetail, userDetail } = context;
  const ref = useRef();

  useEffect(() => {
    fetchUserDetail();
    // eslint-disable-next-line 
  }, [])

  const profileSlider = () => {
    ref.current.classList.toggle("active");
  };

  const LogoutUser = () => {
    localStorage.removeItem("auth");
    window.location.reload("/");
  };

  return (
    <>
      <header className="frontHeader">
        <nav>
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <span>E-commerce</span>
            </Link>
          </div>
          {/* Search */}
          <div className="search">
            <form action="#">
              <div className="search-input">
                <input type="text" placeholder="Search Product..." />
                <button>Search</button>
              </div>
            </form>
          </div>
          {/* Menu */}
          <div className="menu">
            <ul>
              {!localStorage.getItem("auth") && (
                <>
                  <Link exact to="/login">
                    <button className="btn btn-primary">Login</button>
                  </Link>
                  &nbsp; &nbsp;
                  <Link exact to="/sign">
                    <button className="btn btn-primary">Sign</button>
                  </Link>
                </>
              )}

              {localStorage.getItem("auth") && (
                <li onClick={() => profileSlider()}>
                  <span className="arrow-profile">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </span>
                  <ion-icon name="person-outline"></ion-icon>
                  <div className="profile-detail-slider" ref={ref}>
                    <p>{userDetail.email}</p>
                    <div className="profile-icon">
                      <Link to="/userprofile">
                        <div className="profile-item">
                          <div className="icon">
                            <ion-icon name="person-outline"></ion-icon>
                          </div>
                          <div className="text">Profile</div>
                        </div>
                      </Link>

                      <Link to="/order">
                        <div className="profile-item">
                          <div className="icon">
                            <ion-icon name="star-half-outline"></ion-icon>
                          </div>
                          <div className="text">Order</div>
                        </div>
                      </Link>

                      <Link to="/addtocard">
                        <div className="profile-item">
                          <div className="icon">
                            <ion-icon name="basket-outline"></ion-icon>
                          </div>
                          <div className="text">Add Card</div>
                        </div>
                      </Link>

                      <div className="profile-item" onClick={LogoutUser}>
                        <div className="icon">
                          <ion-icon name="log-out-outline"></ion-icon>
                        </div>
                        <div className="text">Logout</div>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              <Link to="/addtocard">
                <li className="shopping-card">
                  <ion-icon name="basket-outline"></ion-icon>
                  <span>{item.length}</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Top;
