import React, { useEffect, useState } from "react";
import { fetchPosts, fetchComments } from "../api";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      const postsData = await fetchPosts();
      const commentsData = await fetchComments();

      const postCommentCounts = postsData.map((post) => ({
        ...post,
        commentCount: commentsData.filter((comment) => comment.postId === post.id).length,
      }));

      const maxComments = Math.max(...postCommentCounts.map((post) => post.commentCount));
      const trendingPosts = postCommentCounts.filter((post) => post.commentCount === maxComments);

      setPosts(trendingPosts);
    };

    getTrendingPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
            <p className="text-sm text-gray-600">Comments: {post.commentCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
