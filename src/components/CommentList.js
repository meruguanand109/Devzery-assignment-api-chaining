const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      <h2>Comments:</h2>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.name}</strong> ({comment.email}): {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
