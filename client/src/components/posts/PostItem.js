import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

import { link } from "../../utils/section";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, name, user, avatar, text, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions
}) => (
  <div
    className="post bg-white p-1 my-1 post-card"
    style={{ borderRadius: "8px" }}
  >
    <div>
      <Link
        to={`/profile/${user}`}
        title={`View ${name.trim().split(" ")[0]}'s Profile`}
      >
        <img className="round-img" src={avatar} alt={name} />
        <h4 style={{ marginBottom: "0" }}>{name}</h4>
      </Link>
    </div>

    <div
      style={{ width: "450px", wordWrap: "break-word" }}
      className="flex-post-card"
    >
      <p className="my-1 post-text">{text}</p>
      <p className="post-date">
        Posted at <Moment format="h:mm">{date}</Moment> on{" "}
        <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>

      <div className="post-actions">
        <button
          onClick={() => addLike(_id)}
          type="button"
          className="btn btn-light"
          style={link}
          title="Like"
        >
          <i className="fas fa-thumbs-up" />
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "8px",
              position: "relative",
              top: "2px"
            }}
          >
            {likes.length > 0 && <span>{likes.length}</span>}
          </span>
        </button>
        <button
          onClick={() => removeLike(_id)}
          type="button"
          className="btn btn-light"
          style={link}
          title="Unlike"
        >
          <i className="fas fa-thumbs-down" />
        </button>

        {showActions && (
          <Fragment>
            <Link
              to={`/post/${_id}`}
              className="btn btn-primary"
              title="Discussion"
              style={link}
            >
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                style={link}
                title="Delete Post"
                onClick={() => deletePost(_id)}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
