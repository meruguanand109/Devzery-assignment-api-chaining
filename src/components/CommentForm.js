import { useState } from "react";

const CommentForm = ({ postId, addComment }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, name, email, body);
    setName(""); // Clear the form
    setEmail(""); // Clear the form
    setBody(""); // Clear the form
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h4>Add a Comment</h4>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Comment:</label>
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

export default CommentForm;
