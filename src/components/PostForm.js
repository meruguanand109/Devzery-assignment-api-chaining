import { useState } from "react";

const PostForm = ({ userId, createPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(title, body, userId);
    setTitle(""); // Clear the form
    setBody("");  // Clear the form
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h3>Create a New Post</h3>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
