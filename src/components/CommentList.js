const CommentList = ({ comments }) => {
    return (
      <div className="comment-list">
        <h5>Comments</h5>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <h6>{comment.name} <small>({comment.email})</small></h6>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default CommentList;
  