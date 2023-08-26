"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const PostList = ({ posts }) => {
  const { data: session } = useSession();

  const convertDate = (date) => {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  };

  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="max-w-screen-lg w-full p-4">
        {posts.length > 0 || session ? (
          <ul className="bg-gray-900 rounded-md">
            <h2 className="text-gray-100 text-xl font-semibold mb-4">Posts</h2>
            {posts.map((post) => (
              <li key={post.id} className="bg-gray-800 p-4 rounded-md mb-4">
                <h3 className="text-gray-100 text-xl font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300">{post.content}</p>
                <p className="text-gray-400 mt-2">{post.authorEmail}</p>
                <p className="text-gray-500 mt-2 text-xs">
                  {" "}
                  {convertDate(post.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            {session
              ? "No posts to display"
              : "Please sign in to create/view posts"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostList;
