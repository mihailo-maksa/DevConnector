import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfileById } from "../../actions/profile";
import section from "../../utils/section";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  auth,
  profile: { profile, loading },
  getProfileById,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <section className="container" style={section}>
      {profile === null && !loading && (
        <p>
          <b>Profile Not Found</b>
        </p>
      )}
      {profile === null || loading ? (
        <div style={{ display: loading ? "block" : "none" }}>
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Link
              to="/profiles"
              className="btn btn-dark"
              title="Back To Profiles"
              style={{
                fontWeight: "bold",
                borderRadius: "5px"
              }}
            >
              ↩ Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link
                  to="/edit-profile"
                  title="Edit Profile"
                  style={{
                    fontWeight: "bold",
                    borderRadius: "5px"
                  }}
                  className="btn btn-dark"
                >
                  <i className="fas fa-user-circle text-primary" /> Edit Profile
                </Link>
              )}
          </div>

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div
              className="profile-exp bg-white p-2"
              style={{ borderRadius: "8px" }}
            >
              <h2 className="text-primary" style={{ textAlign: "center" }}>
                Experience
              </h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>
                  <b>No Experience Credentials</b>
                </h4>
              )}
            </div>

            <div
              className="profile-edu bg-white p-2"
              style={{ borderRadius: "8px" }}
            >
              <h2 className="text-primary" style={{ textAlign: "center" }}>
                Education
              </h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>
                  <b>No Education Credentials</b>
                </h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub
                username={profile.githubusername}
                name={profile.user.name}
              />
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);
