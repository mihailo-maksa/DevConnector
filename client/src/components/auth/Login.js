import React, { useState, memo } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";
import section from "../../utils/section";

const Login = ({ login, isAuthenticated }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userInfo;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setUserInfo({
      email: "",
      password: ""
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container" style={section}>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
            value={password}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Login"
          style={{ borderRadius: "5px", fontWeight: "bold" }}
          title="Login"
        />
      </form>
      <p className="my-1">
        Don't have an account?{" "}
        <Link to="/register" style={{ fontWeight: "bold" }} title="Sign Up">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default memo(connect(mapStateToProps, { login })(Login));
