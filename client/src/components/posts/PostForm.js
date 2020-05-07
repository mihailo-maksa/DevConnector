import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };

  return (
    <div className="post-form">
      <div
        className="bg-primary p"
        style={{ borderRadius: "5px", textAlign: "center" }}
      >
        <h3>Say Something...</h3>
      </div>

      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="37"
          rows="6"
          placeholder="Create a Post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ borderRadius: "5px" }}
          required
        />
        <input
          type="submit"
          className="btn btn-dark my-1"
          value="Submit"
          style={{ borderRadius: "5px", fontWeight: "bold" }}
          title="Add Post"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default memo(connect(null, { addPost })(PostForm));
