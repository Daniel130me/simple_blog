import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`${API_BASE_URL}/posts/${id}`, {
          method: "DELETE",
        });
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div>
      <h2>Manage Posts</h2>
      <Link to="/admin/add-post">
        <button>Add New Post</button>
      </Link>
      <div style={{ marginTop: "20px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{post.title}</h3>
            <p>
              by {post.author} on {post.date}
            </p>
            <div>
              <button
                onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
