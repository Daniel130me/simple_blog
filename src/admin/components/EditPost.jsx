import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  // http://localhost:5000/posts/:id
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        const data = await response.json();
        console.log(data);
        setTitle(data.title);
        setBody(data.body);
        setImageUrl(data.imageUrl);
        setAuthor(data.author);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      body,
      imageUrl,
      author,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      navigate("/admin/manage-posts");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Edit Post</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", height: "200px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
