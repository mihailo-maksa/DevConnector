import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

import { deleteComment } from "../../actions/post";

const CommentItem = ({
  auth,
  comment: { _id, user, name, avatar, text, date },
  deleteComment,
  postId
}) => (
  <div
    className="post bg-white p-1 my-1 post-card"
    style={{ borderRadius: "8px" }}
  >
    <div>
      <Link
        to={`/profile/${user}`}
        title={`Visit ${name.trim().split(" ")[0]}'s Profile`}
      >
        <img className="round-img" src={avatar} alt={name} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div
      style={{ width: "450px", wordWrap: "break-word" }}
      className="flex-post-card"
    >
      <p className="my-1 post-text">{text}</p>
      <div className="flex-comment-actions">
        <p className="post-date">
          Posted at <Moment format="h:mm">{date}</Moment> on{" "}
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            title="Delete Comment"
            style={{
              fontWeight: "bold",
              borderRadius: "5px",
              marginLeft: "25px",
              position: "relative",
              bottom: "4px"
            }}
            onClick={() => deleteComment(postId, _id)}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
