import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description }
}) => (
  <div>
    <h3 className="text-dark" style={{ textAlign: "center" }}>
      {school}
    </h3>

    <p style={{ textAlign: "center" }}>
      {<Moment format="DD/MM/YYYY">{from}</Moment>} -{" "}
      {!to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>

    <p>
      <strong>Degree: </strong> {degree}
    </p>

    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>

    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
