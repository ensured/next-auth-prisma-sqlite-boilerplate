"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const notify = (msg) => toast(msg);

  useEffect(() => {
    const checkUserExists = async () => {
      const response = await axios.post("/api/checkUserExists", {
        email: session?.user?.email,
      });
      if (!response.data.exists) {
        console.log("User does not exist, creating user");
        const response = await axios
          .post("/api/createUser", {
            name: session?.user?.name,
            email: session?.user?.email,
          })
          .then(notify("User created"))
          .catch((error) => {
            notify("Error creating user:", error);
          });
      }
    };

    if (session) {
      checkUserExists();
    }
  }, [session]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        console.log("Posts fetched:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [posts]);

  return (
    <div>
      <main>
        {session && (
          <div className="flex justify-center items-center hover:bg-gray-950">
            <Button
              className="text-gray-100 px-4 py-2 rounded-md"
              onClick={() => setShowForm(!showForm)}
            >
              Create Post
            </Button>
          </div>
        )}
        {session && posts.length > 0 && (
          <>
            <div className={`form-slide-in ${showForm ? "visible" : ""}`}>
              <PostForm showForm={showForm} setShowForm={setShowForm} />
            </div>

            <PostList posts={posts} />
          </>
        )}
      </main>
    </div>
  );
}
