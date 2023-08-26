// components/EditablePost.jsx
"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditPost({ initialTitle, initialContent, postId }) {
	const [editedTitle, setEditedTitle] = useState(initialTitle);
	const [editedContent, setEditedContent] = useState(initialContent);
	const pathname = usePathname();
	const notify = (msg) => toast.success(msg);
	const url = pathname.replace("/edit", "");
	const router = useRouter();

	// Implement your save logic using Prisma in a serverless function
	const handleUpdatePost = async () => {
		try {
			const updatedPost = await axios.post("/api/updatePost", {
				id: postId,
				title: editedTitle,
				content: editedContent,
			});
			setEditedTitle(updatedPost.data.updatedPost.title);
			setEditedContent(updatedPost.data.updatedPost.content);
			notify("Post updated successfully");
			setTimeout(() => {
				router.push(url);
			}, 1100);
		} catch (error) {
			console.error("Error saving post:", error);
		}
	};

	return (
		<div className="min-h-screen p-2">
			<div className="flex flex-col items-center justify-center p-4 ">
				<div className="bg-slate-600 rounded-md w-full ">
					<TextField
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						variant="outlined"
						fullWidth
					/>
				</div>
				<div className="bg-slate-600 rounded-md w-full  mt-2">
					<TextField
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
						variant="outlined"
						multiline
						fullWidth
						rows={5}
					/>
				</div>
				<div className="mt-2 bg-lime-500 rounded-md">
					<Button
						sx={{
							px: 6,
							py: 2,
							color: "black",
							fontWeight: "bold",
							fontSize: "1.2rem",
							borderRadius: "6px",
						}}
						variant="contained"
						color="success"
						onClick={handleUpdatePost}
					>
						Save
					</Button>
				</div>
			</div>
			<Toaster />
		</div>
	);
}
