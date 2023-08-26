"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";
import Link from "next/link";

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

	const Btn = (
		<Button
			className="text-gray-100 text-xl font-semibold mb-4"
			onClick={() => setShowForm(!showForm)}
		>
			Create Post
		</Button>
	);

	return (
		<div>
			<main>
				<div className={`form-slide-in ${showForm ? "visible" : ""}`}>
					<PostForm showForm={showForm} setShowForm={setShowForm} />
				</div>

				{posts && (
					<div className="flex justify-center bg-gray-900 min-h-screen">
						<div className="max-w-screen-lg w-full p-4 ">
							<PostList posts={posts} Btn={Btn} />
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
