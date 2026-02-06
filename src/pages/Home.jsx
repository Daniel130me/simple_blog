import React, { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import ChatBot from "react-chatbotify";
import API_BASE_URL from "../apiConfig";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flowSteps = {
    start: {
      message: "Hello! How can I assist you today?",
      // trigger: "userResponse",}
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        // console.log("fetch",data.slice(1,))
        setPosts(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Latest Posts</h1>
      <BlogList posts={posts} />
      <ChatBot flow={flowSteps} />
    </div>
  );
};

export default Home;
