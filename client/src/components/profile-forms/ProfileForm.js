import React, { useState, useEffect, Fragment, memo } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import section, { link } from "../../utils/section";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: ""
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };

      for (let key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      for (let key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, profile, getCurrentProfile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history, profile ? true : false);

    setFormData({
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: ""
    });
  };

  return (
    <section className="container" style={section}>
      <h1 className="large text-primary">
        {profile ? "Edit Your Profile" : "Create Your Profile"}
      </h1>
      <p className="lead" style={{ textAlign: "center" }}>
        <i className="fas fa-user"></i>{" "}
        {profile
          ? "Add some changes to your profile"
          : "Let's get some information to make your profile stand out!"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            name="status"
            onChange={handleChange}
            value={status}
            required
            title="This field is required."
            style={{ borderRadius: "5px" }}
          >
            <option value="">* Select Your Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            onChange={handleChange}
            value={company}
            style={{ borderRadius: "5px" }}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={handleChange}
            value={website}
            style={{ borderRadius: "5px" }}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={handleChange}
            value={location}
            style={{ borderRadius: "5px" }}
          />
          <small className="form-text">City & state, e.g. Miami, FL</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            onChange={handleChange}
            value={skills}
            required
            title="This field is required."
            style={{ borderRadius: "5px" }}
          />
          <small className="form-text">
            Please use comma separated values (e.g. HTML, CSS, JavaScript, PHP)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={handleChange}
            value={githubusername}
            style={{ borderRadius: "5px" }}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, please include your
            username
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself..."
            name="bio"
            cols="8"
            rows="6"
            onChange={handleChange}
            value={bio}
            style={{ borderRadius: "5px" }}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            style={link}
            title={displaySocialInputs ? "Hide" : "Add Social Media Links"}
          >
            {displaySocialInputs ? "Hide" : "Add Social Media Links"}
          </button>
          <span>{!displaySocialInputs && "(Optional)"}</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                onChange={handleChange}
                value={twitter}
                style={{ borderRadius: "5px" }}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                onChange={handleChange}
                value={facebook}
                style={{ borderRadius: "5px" }}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                onChange={handleChange}
                value={youtube}
                style={{ borderRadius: "5px" }}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                onChange={handleChange}
                value={linkedin}
                style={{ borderRadius: "5px" }}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                onChange={handleChange}
                value={instagram}
                style={{ borderRadius: "5px" }}
              />
            </div>
          </Fragment>
        )}

        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Submit"
          name="submit"
          style={{
            fontWeight: "bold",
            borderRadius: "5px",
            marginRight: "20px"
          }}
          title="Submit"
        />

        <Link
          className="btn btn-dark my-1"
          to="/dashboard"
          style={link}
          title="Go Back to Dashboard"
        >
          Go Back to Dashboard
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default memo(
  connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(ProfileForm)
  )
);
