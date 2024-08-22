import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import RollList from "../pages/RollList";
import Registration from "../pages/Registration";
import classes from "./AdminDashboard.module.css";

const AdminDashBoard = () => {
  return (
    <div className={classes.adminDashboardContainer}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<RollList />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
      </Routes>
    </div>
  );
};

export default AdminDashBoard;
