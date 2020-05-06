import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div
      className="profile bg-light profile-card"
      style={{ borderRadius: "8px" }}
    >
      <img src={avatar} alt={name} className="round-img" title={name} />
      <div>
        <h2>{name}</h2>
        <p className="my-1" style={{ marginBottom: "0" }}>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1" style={{ marginTop: "0" }}>
          {location && <span>{location}</span>}
        </p>
        <Link
          to={`/profile/${_id}`}
          className="btn btn-primary"
          style={{ fontWeight: "bold", borderRadius: "6px" }}
          title={`View ${name.trim().split(" ")[0]}'s Profile`}
        >
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index}>
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
