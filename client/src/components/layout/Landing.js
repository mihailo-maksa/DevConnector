import React, { memo } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">DevConnector</h1>
          <p className="lead">
            Create a developer profile & portfolio, share posts, get help from
            other developers & more!
          </p>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-primary"
              style={{
                borderRadius: "5px",
                marginRight: "25px",
                fontWeight: "bold"
              }}
              title="Sign Up"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="btn btn-light"
              style={{ borderRadius: "5px", fontWeight: "bold" }}
              title="Login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default memo(connect(mapStateToProps)(Landing));
