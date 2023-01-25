import React, { useContext } from "react";
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
                <form method="post">
                  <input type="text" value={userDetail.name} disabled />
                  <input type="text" value={userDetail.email} disabled />
                  <input type="text" value={userDetail.gender} disabled />
                  <input type="text" value={userDetail.birth_date} disabled />
                </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default UserProfile;
