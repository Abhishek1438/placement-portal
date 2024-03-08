import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/Dashboard";
import News from "../pages/News";
import classes from "./AdminDashboard.module.css";

const AdminDashBoard = () => {
  return (
    <div className={classes.adminDashboardContainer}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashBoard></DashBoard>}></Route>
        <Route path="/news" element={<News></News>}></Route>
      </Routes>
    </div>
  );
};

export default AdminDashBoard;
