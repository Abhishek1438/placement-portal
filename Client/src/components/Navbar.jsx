import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/admin">Admin Dashboard</Link>
    </>
  );
};

export default Navbar;
