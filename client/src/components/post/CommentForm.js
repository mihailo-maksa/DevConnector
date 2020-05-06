import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <div className="post-form">
      <div
        className="bg-primary p"
        style={{ textAlign: "center", borderRadius: "5px" }}
      >
        <h3>Leave A Comment</h3>
      </div>

      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="37"
          rows="6"
          placeholder="Comment on This Post..."
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
          title="Add Comment"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentForm);
