import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";
import { link } from "../../utils/section";

const Navbar = ({ logout, isAuthenticated, loading }) => {
  const authLinks = (
    <ul>
      <li>
        <Link
          to="/profiles"
          style={{ fontWeight: "bold", fontSize: "16px" }}
          title="View Developers"
        >
          Developers
        </Link>
      </li>
      <li>
        <Link
          to="/posts"
          style={{ fontWeight: "bold", fontSize: "16px" }}
          title="View Posts"
        >
          Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard" title="Dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm" style={link}>
            Dashboard
          </span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!" title="Logout">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm" style={link}>
            Logout
          </span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link
          to="/profiles"
          style={{ fontWeight: "bold", fontSize: "16px" }}
          title="View Developers"
        >
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register" style={link} title="Register">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" style={link} title="Login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav
      className="navbar bg-dark"
      style={{ borderBottom: "3px solid #17a2b8" }}
    >
      <h1>
        <Link to="/" title="DevConnector">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logout })(Navbar);
