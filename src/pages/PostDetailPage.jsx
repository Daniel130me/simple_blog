import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../apiConfig";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete post");
        }
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail">
      <img src={post.imageUrl} alt={post.title} />
      <div className="post-detail-content">
        <h1>{post.title}</h1>
        <div className="author">
          By: {post.author} on {post.date}
        </div>
        <p>{post.body}</p>
        {/* <Link to={`/admin/edit-post/${id}`} className="btn">Edit</Link>
        <button onClick={handleDelete} className="btn btn-delete">Delete</button> */}
      </div>
    </div>
  );
};

export default PostDetailPage;
