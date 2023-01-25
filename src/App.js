import React from "react";
import Root from "./Component/Root";
import "./App.css";
import AdminRoot from "./admin/AdminRoot";
import AdminState from "./admin/AdminContext/AdminState";
import UserState from "./UserContext/UserState";
const App = () => {
  return (
    <>
      {/* FrontEnd */}
      <UserState>
        <Root />
      </UserState>
      {/* BackEnd */}
      <AdminState>
        <AdminRoot />
      </AdminState>
    </>
  );
};

export default App;
