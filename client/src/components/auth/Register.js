import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import section from "../../utils/section";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, email, password, confirmPassword } = userInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords don't match, please try again!", "danger");
      setUserInfo({
        password: "",
        confirmPassword: ""
      });
    } else {
      register({ name, email, password });
      setUserInfo({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container" style={section}>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            style={{
              borderRadius: "5px"
            }}
            required
            title="This field is required."
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            style={{
              borderRadius: "5px"
            }}
            required
            title="This field is required."
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile picture use a
            Gravatar email.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
            value={password}
            onChange={handleChange}
            style={{
              borderRadius: "5px"
            }}
            required
            title="This field is required."
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="8"
            value={confirmPassword}
            onChange={handleChange}
            style={{
              borderRadius: "5px"
            }}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Register"
          style={{
            borderRadius: "5px",
            fontWeight: "bold"
          }}
          title="Register"
        />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <Link to="/login" style={{ fontWeight: "bold" }} title="Sign In">
          Sign In
        </Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
