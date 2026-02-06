
import React from 'react';
import BlogItem from './BlogItem';
// props = { posts: Array(20) }
const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;