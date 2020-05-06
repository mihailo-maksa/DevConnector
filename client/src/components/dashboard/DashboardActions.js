import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  const linkStyle = {
    borderRadius: "5px",
    marginRight: "15px",
    marginBottom: "15px"
  };

  return (
    <div className="dash-buttons">
      <Link
        to="/edit-profile"
        className="btn btn-dark"
        style={linkStyle}
        title="Edit Profile"
      >
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link
        to="/add-experience"
        className="btn btn-dark"
        style={linkStyle}
        title="Add Experience"
      >
        <i className="fab fa-black-tie text-primary" /> Add Experience
      </Link>
      <Link
        to="/add-education"
        className="btn btn-dark"
        style={linkStyle}
        title="Add Education"
      >
        <i className="fas fa-graduation-cap text-primary" /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
