import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  // setTitle("presidient tinubu")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      title,
      body,
      imageUrl,
      author,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      navigate("/admin/manage-posts");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Add New Post</h2>
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
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
