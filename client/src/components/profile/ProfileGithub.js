import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getGithubRepos } from "../../actions/profile";
import { link } from "../../utils/section";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ getGithubRepos, username, repos, name }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github">
      <h2
        className="text-primary my-1 github-repos"
        style={{ textAlign: "center" }}
      >
        <i className="fab fa-github"></i> {name.trim().split(" ")[0]}
        's Latest Github Repos
      </h2>

      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div
            key={repo.id}
            className="repo bg-white p-1 my-1"
            style={{ borderRadius: "8px" }}
          >
            <div>
              <h4 style={{ textAlign: "center" }}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={repo.name}
                >
                  {repo.name}
                </a>
              </h4>
              <p>
                {" "}
                <b>Language(s): </b> {repo.language !== null && repo.language}
              </p>
              <p>
                {" "}
                <b>Description: </b>{" "}
                {repo.description !== null
                  ? repo.description
                  : "No Description"}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary" style={link}>
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark" style={link}>
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light" style={link}>
                  Forks: {repo.forks}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  name: state.profile.profile.user.name
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
