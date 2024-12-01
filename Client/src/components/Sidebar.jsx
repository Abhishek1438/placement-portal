import React, { useState } from "react";
import Icon from "../Images/Icon.svg";
import Profile from "../Images/profile.png";
import Dashboard from "../Images/dashboard.svg";
import Transactions from "../Images/transactions.svg";
import Performance from "../Images/performance.svg";
import News from "../Images/news.svg";
import Settings from "../Images/settings.svg";
import Support from "../Images/support.svg";
import { useLocation } from "react-router-dom";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { LineChartOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div
      className={
        closeMenu === false
          ? classes.sidebar
          : `${classes.sidebar} ${classes.active}`
      }
    >
      <div
        className={
          closeMenu === false
            ? classes.logoContainer
            : `${classes.logoContainer} ${classes.active}`
        }
      >
        <img src={Icon} alt="icon" className={classes.logo} />
        <h2 className={classes.title}>Placement Portal </h2>
      </div>
      <div
        className={
          closeMenu === false
            ? classes.burgerContainer
            : `${classes.burgerContainer} ${classes.active}`
        }
      >
        <div
          className={classes.burgerTrigger}
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className={classes.burgerMenu}></div>
      </div>
      {/* <div
        className={
          closeMenu === false
            ? classes.profileContainer
            : `${classes.profileContainer} ${classes.active}`
        }
      >
        <img src={Profile} alt="profile" className={classes.profile} />
        <div className={classes.profileContents}>
          <p className={classes.name}>Hello, Admin</p>
          <p>admin@gmail.com</p>
        </div>
      </div> */}
      <div
        className={
          closeMenu === false
            ? classes.contentsContainer
            : `${classes.contentsContainer} ${classes.active}`
        }
      >
        <ul>
          <li className={location.pathname === "/admin" ? classes.active : ""}>
            <Link to="/admin/">
              <img src={Dashboard} alt="dashboard" />
              <span>RollList</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/admin/registration" ? classes.active : ""
            }
          >
            <Link to="/admin/registration">
              <img src={Transactions} alt="registration" />
              <span>Registrations</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/admin/job-notification"
                ? classes.active
                : ""
            }
          >
            <Link to="/admin/job-notification">
              <img src={Performance} alt="job-notification" />
              <span>Job Notifications</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/admin/express-of-interest"
                ? classes.active
                : ""
            }
          >
            <Link to="/admin/express-of-interest">
              <img src={News} alt="express-of-interest" />
              <span>Express of Interests</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/admin/placement-process"
                ? classes.active
                : ""
            }
          >
            <Link to="/admin/placement-process">
              <img src={Settings} alt="placement-process" />
              <span>Placement process</span>
            </Link>
          </li>
          <li
            className={
              location.pathname === "/admin/support" ? classes.active : ""
            }
          >
            <Link to="/admin/placement-stats">
              <LineChartOutlined style={{ marginRight: "10px" }} />
              <span>Placement-Stats</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
