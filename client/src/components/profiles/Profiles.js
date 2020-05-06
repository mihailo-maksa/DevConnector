import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import section from "../../utils/section";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const filteredProfiles = profiles.filter((profile) =>
    profile.user.name.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <section style={section}>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead developers-title" style={{ textAlign: "center" }}>
            <i className="fab fa-connectdevelop" /> Browse & Connect with
            Developers From All Around the World!
          </p>

          <div className="form">
            <div className="form-group">
              <input
                type="search"
                placeholder="Search Developers"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 0 10px #ddd",
                  position: "relative",
                  bottom: "10px",
                  width: "225px"
                }}
                title="Search Developers..."
                className="search-input"
              />
            </div>
          </div>

          <div className="profiles">
            {profiles.length > 0 && text.length > 0 ? (
              filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>
                  <b>No Profiles Found</b>
                </h4>
              )
            ) : (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            )}
          </div>

          {!profiles.length > 0 && (
            <h4>
              <b>No Profiles Found</b>
            </h4>
          )}
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
