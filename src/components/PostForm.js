"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PostForm = ({ authorEmail, showForm, setShowForm }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const notify = (msg) => toast(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/createPost", {
        authorEmail,
        title,
        content,
      });
      console.log("Post created");
      setTitle("");
      setContent("");
      notify("Post created");
    } catch (error) {
      notify("Error creating post: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-4 rounded-md border-2 border-gray-800"
    >
      <h2 className="text-gray-100 text-xl font-semibold mb-4">Create Post</h2>
      <label className="text-gray-300 block mb-2">
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full bg-gray-700 text-gray-300 rounded-md p-2"
        />
      </label>
      <label className="text-gray-300 block mb-2">
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full bg-gray-700 text-gray-300 rounded-md p-2"
        />
      </label>
      <button
        type="submit"
        className="bg-gray-900 text-gray-100 px-4 py-2 rounded-md"
        onClick={() => setShowForm(!showForm)}
      >
        Create Post
      </button>
      <Toaster />
    </form>
  );
};

export default PostForm;
