import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";

const LiveFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      const data = await fetchPosts();
      setPosts(data.slice(-10).reverse());
    };

    getFeed();

    const interval = setInterval(getFeed, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live Feed</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveFeed;
