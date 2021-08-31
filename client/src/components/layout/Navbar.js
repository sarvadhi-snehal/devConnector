import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fa fa-user"></i>
          <span>Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fa fa-user"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => dispatch(logout())} href="#!">
          <i className="fa fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
export default Navbar;
