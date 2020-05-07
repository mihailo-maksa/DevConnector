import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Fab } from "@material-ui/core";

import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, name, user, avatar, text, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions
}) => {
  return (
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

        {showActions && (
          <div className="post-actions">
            <Fab
              onClick={() => {
                addLike(_id);
              }}
              type="button"
              className="btn btn-dark"
              style={{
                backgroundColor: "#343a40",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "bold",
                height: "37px",
                position: "relative",
                bottom: "1px",
                marginRight: "8px",
                fontSize: "16px"
              }}
              title="Like"
            >
              <i className="fas fa-thumbs-up" />
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "8px",
                  position: "relative",
                  top: "2px",
                  color: "#fff"
                }}
              >
                {likes.length > 0 && <span>{likes.length}</span>}
              </span>
            </Fab>
            <Fab
              onClick={() => {
                removeLike(_id);
              }}
              type="button"
              className="btn btn-dark"
              style={{
                backgroundColor: "#343a40",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "bold",
                height: "37px",
                position: "relative",
                bottom: "1px",
                marginRight: "8px",
                fontSize: "16px"
              }}
              title="Unlike"
            >
              <i className="fas fa-thumbs-down" />
            </Fab>

            <Fragment>
              <Link
                to={`/post/${_id}`}
                className="btn btn-primary"
                title="Discussion"
                style={{
                  fontWeight: "bold",
                  borderRadius: "5px",
                  boxShadow:
                    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                  height: "37px",
                  textAlign: "center",
                  position: "relative",
                  bottom: "1px"
                }}
              >
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count" style={{ marginLeft: "7px" }}>
                    {comments.length}
                  </span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <Fab
                  type="button"
                  className="btn btn-danger"
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    height: "37px",
                    width: "36px",
                    position: "relative",
                    bottom: "1px",
                    marginRight: "8px",
                    fontSize: "16px",
                    boxShadow:
                      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
                  }}
                  title="Delete Post"
                  onClick={() => deletePost(_id)}
                >
                  <i className="fas fa-times" />
                </Fab>
              )}
            </Fragment>
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
