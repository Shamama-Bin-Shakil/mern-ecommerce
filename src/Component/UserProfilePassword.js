import React, { useContext, useState } from "react";
import Top from "./Top";
import UserProfileTemplate from "./UserProfileTemplate";

import UserContext from "../UserContext/UserContext";
import { useEffect } from "react";

const UserProfile = () => {
  const context = useContext(UserContext);
  const { userDetail, userLogin, fetchUserDetail } = context;

  // Check User Login
  useEffect(() => {
    userLogin();
    fetchUserDetail();
  }, []);

  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPasswordState((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const passwordHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("currentPassword", passwordState.currentPassword);
    formData.append("newPassword", passwordState.newPassword);
    formData.append("confirmPassword", passwordState.confirmPassword);
    const url = `${process.env.REACT_APP_HOST}/api/auth/userpasswordupdate`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth"),
      },
      body: JSON.stringify({
        currentPassword: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
        confirmPassword: passwordState.confirmPassword,
      }),
    });
    const result = await response.json();
    if(result.status === "success") {
      alert(result.msg);
    }
  };

  return (
    <div>
      <Top />
      <section className="wrapper">
        <main>
          <div className="heading">
            <h1>User Profile</h1>
          </div>
          <div className="frontUserProfileSection">
            <UserProfileTemplate />
            <div className="userprofile-right">
              <form onSubmit={passwordHandler}>
                <input
                  type="text"
                  name="currentPassword"
                  onChange={handleOnChange}
                  value={passwordState.currentPassword}
                  placeholder="Current Password"
                  required
                />
                <input
                  type="text"
                  name="newPassword"
                  onChange={handleOnChange}
                  value={passwordState.newPassword}
                  placeholder="New Password"
                  required
                />
                <input
                  type="text"
                  onChange={handleOnChange}
                  name="confirmPassword"
                  value={passwordState.confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Password Update
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default UserProfile;
