import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import section from "../../utils/section";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost, addLike, removeLike } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";

const Post = ({
  auth,
  getPost,
  post: { post, loading },
  match,
  addLike,
  removeLike
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container" style={section}>
      <Link
        to="/posts"
        className="btn btn-dark"
        style={{
          fontWeight: "bold",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
        title="Back To Posts"
      >
        ↩ Back To Posts
      </Link>

      <PostItem
        post={post}
        addLike={addLike}
        removeLike={removeLike}
        showActions={false}
      />

      <CommentForm postId={post._id} />

      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPost,
  addLike,
  removeLike
})(Post);
