import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./Component/Index";

const AdminRoot = () => {
  return (
    <div>
        <Routes>
          <Route path="/admin/" element={<Index />} />
        </Routes>
    </div>
  );
};

export default AdminRoot;
