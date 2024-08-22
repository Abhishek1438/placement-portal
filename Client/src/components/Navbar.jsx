import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/admin">Admin Dashboard</Link>
      <Link to="/job-notification-form">Job Notification Form</Link>
    </>
  );
};

export default Navbar;
