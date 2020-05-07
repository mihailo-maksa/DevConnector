import React, { useState, memo } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addExperience } from "../../actions/profile";
import section from "../../utils/section";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { title, company, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
    setFormData({
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: ""
    });
  };

  return (
    <section className="container" style={section}>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead" style={{ textAlign: "center" }}>
        <i className="fas fa-code-branch" /> Add any developer or programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
          />
        </div>

        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>

        <div className="form-group">
          <p style={{ fontWeight: "bold" }}>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              id="c2"
            />{" "}
            <label htmlFor="c2">Current Job</label>
          </p>
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>

        <div className="form-group">
          <textarea
            name="description"
            cols="8"
            rows="6"
            placeholder="Job Description"
            value={description}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Submit"
          style={{
            borderRadius: "5px",
            marginRight: "15px",
            fontWeight: "bold"
          }}
          title="Submit"
        />

        <Link
          className="btn btn-dark my-1"
          to="/dashboard"
          style={{ borderRadius: "5px", fontWeight: "bold" }}
          title="Go Back to Dashboard"
        >
          Go Back to Dashboard
        </Link>
      </form>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default memo(
  connect(null, { addExperience })(withRouter(AddExperience))
);
