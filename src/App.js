import { useState, useEffect } from "react";
import axios from "axios";
import UserSelector from "./components/UserSelector";
import PostForm from "./components/PostForm";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]); // Array to store user's posts
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch users when the component mounts
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const createPost = (title, body, userId) => {
    // Create a new post for the selected user
    setLoading(true);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { title, body, userId })
      .then((response) => {
        setPosts([...posts, response.data]); // Add the new post to the post list
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to create post");
        setLoading(false);
      });
  };

  const fetchUserPosts = (userId) => {
    // Fetch posts for the selected user
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data); // Update the posts list with user's posts
        setLoading(false);
        fetchCommentsForPosts(response.data); // Fetch comments for each post
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      });
  };

  const fetchCommentsForPosts = (posts) => {
    // Fetch comments for each post in the list
    const commentsRequests = posts.map((post) =>
      axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    );
    Promise.all(commentsRequests)
      .then((responses) => {
        const newComments = {};
        responses.forEach((response, index) => {
          newComments[posts[index].id] = response.data; // Store comments by postId
        });
        setComments(newComments); // Update comments state
      })
      .catch(() => setError("Failed to load comments"));
  };

  const addComment = (postId, name, email, body) => {
    // Simulate adding a new comment for the post
    const newComment = {
      postId,
      id: comments[postId] ? comments[postId].length + 1 : 1,
      name,
      email,
      body,
    };
    setComments({
      ...comments,
      [postId]: [...(comments[postId] || []), newComment], // Add the new comment
    });
  };

  return (
    <div className="container">
      <h1>API Chaining Demo</h1>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}

      {/* User selection */}
      <UserSelector
        users={users}
        setSelectedUser={(user) => {
          setSelectedUser(user);
          fetchUserPosts(user.id); // Fetch posts when user is selected
        }}
      />

      {/* Show post form when a user is selected */}
      {selectedUser && <PostForm userId={selectedUser.id} createPost={createPost} />}

      {/* Show user's posts and associated comments */}
      {posts.length > 0 && (
        <div>
          <h2>{selectedUser?.name}'s Posts:</h2>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>

              {/* Comment Form */}
              <CommentForm
                postId={post.id}
                addComment={addComment}
              />

              {/* Show Comments */}
              <CommentList comments={comments[post.id] || []} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
