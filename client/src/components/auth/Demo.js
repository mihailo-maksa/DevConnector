import React, { useState, memo } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";
import section from "../../utils/section";

const Demo = ({ login, isAuthenticated }) => {
  const [userInfo, setUserInfo] = useState({
    email: "kevinbrown@gmail.com",
    password: "12345678"
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
      email: "kevinbrown@gmail.com",
      password: "12345678"
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container" style={section}>
      <h1 className="large text-primary">Demo User Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Demo Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Demo Email</label>
          <input
            type="email"
            id="demo-email"
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
          <label htmlFor="demo-password">Demo Password</label>
          <input
            id="demo-password"
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
          value="Demo Login"
          style={{ borderRadius: "5px", fontWeight: "bold" }}
          title="Login"
        />
      </form>
    </section>
  );
};

Demo.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default memo(connect(mapStateToProps, { login })(Demo));
