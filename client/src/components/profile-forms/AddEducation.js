import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addEducation } from "../../actions/profile";
import section from "../../utils/section";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
    setFormData({
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: ""
    });
  };

  return (
    <section className="container" style={section}>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead" style={{ textAlign: "center" }}>
        <i className="fas fa-graduation-cap" /> Add any school or bootcamp that
        you've attended
      </p>
      <small>* = required field</small>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={handleChange}
            style={{ borderRadius: "5px" }}
            required
            title="This field is required."
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
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              id="c1"
            />{" "}
            <label htmlFor="c1">Current School or Bootcamp</label>
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
            placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
