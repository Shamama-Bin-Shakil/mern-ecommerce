import React from "react";
import { Link } from "react-router-dom";
const UserProfile = () => {
  const LogoutUser = () => {
    localStorage.removeItem("auth");
    window.location.reload("/");
  };
  return (
    <>
      <div className="userprofile-left">
        <Link exact to="/userprofile">
          <div className="item">
            <div className="icon">
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <div className="text">Profile</div>
          </div>
        </Link>

        <Link exact to="/userprofilepassword">
          <div className="item">
            <div className="icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </div>
            <div className="text">Password</div>
          </div>
        </Link>

        <div className="item">
          <div className="icon">
            <ion-icon name="settings-outline"></ion-icon>
          </div>
          <div className="text">Setting</div>
        </div>


        <div className="item" onClick={LogoutUser}>
          <div className="icon">
            <ion-icon name="log-out-outline"></ion-icon>
          </div>
          <div className="text">Logout</div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
