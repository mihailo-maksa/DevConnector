import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import section from "../../utils/section";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <section className="container" style={section}>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome To The Community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default memo(connect(mapStateToProps, { getPosts })(Posts));
