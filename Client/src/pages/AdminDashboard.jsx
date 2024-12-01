import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import RollList from "./RollList";
import Registration from "./Registration";
import classes from "./AdminDashboard.module.css";
import JobNotification from "./JobNotification";
import ExpressOfInterest from "./ExpressOfInterest";
import PlacementProcess from "./PlacementProcess";
import PlacementStats from "../components/Student/PlacementStats";

const AdminDashBoard = () => {
  return (
    <div className={classes.adminDashboardContainer}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<RollList />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/job-notification" element={<JobNotification />}></Route>
        <Route
          path="/express-of-interest"
          element={<ExpressOfInterest />}
        ></Route>
        <Route path="/placement-process" element={<PlacementProcess />}></Route>
        <Route path="/placement-stats" element={<PlacementStats />}></Route>
      </Routes>
    </div>
  );
};

export default AdminDashBoard;
