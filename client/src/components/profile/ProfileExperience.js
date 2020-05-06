import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, from, to, description }
}) => (
  <div>
    <h3 className="text-dark" style={{ textAlign: "center" }}>
      {company}
    </h3>

    <p style={{ textAlign: "center" }}>
      {<Moment format="DD/MM/YYYY">{from}</Moment>} -{" "}
      {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>

    <p>
      <strong>Position: </strong> {title}
    </p>

    <p>
      <strong>Location: </strong> {location}
    </p>

    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
