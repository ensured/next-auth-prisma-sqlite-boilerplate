// components/EditablePost.jsx
"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SaveIcon from "@mui/icons-material/Save";
import { FormControl } from "@mui/material";

export default function EditPost({
	initialTitle,
	initialContent,
	postId,
	createdAt,
	updatedAt,
}) {
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
			router.push(url);
		} catch (error) {
			console.error("Error saving post:", error);
		}
	};

	return (
		<div className="p-4 flex flex-col bg-slate-800 min-h-screen">
			<FormControl
				fullWidth
				sx={{
					mb: 2,
					"& .MuiInputBase-root": {
						color: "white",
						fontWeight: "bold",
					},
					"& .MuiInputLabel-root": {
						color: "white",
						fontWeight: "bold",
					},
					"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
						borderColor: "white",
						fontWeight: "bold",
					},
				}}
			>
				<TextField
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					label="Title"
					color="warning"
					sx={{ mb: 2 }}
					fullWidth
				/>
				<TextField
					value={editedContent}
					autoFocus
					color="warning"
					label="Content"
					onChange={(e) => setEditedContent(e.target.value)}
					multiline
					fullWidth
					rows={15}
				/>
				<div className="flex flex-row justify-between">
					<p className="text-slate-100 text-sm ">Created {createdAt}</p>
					<p className="text-slate-100 text-sm  ml-2">
						Updated {updatedAt}
					</p>
				</div>
				<div className="flex mt-2 justify-end">
					<Button
						sx={{
							px: 4,
							py: 1,
							color: "white", // Changed text color to white
							fontSize: "1.3rem",
							borderRadius: "6px",
							fontWeight: "bold",
							letterSpacing: "1.7px",
							backgroundColor: "rgb(132, 204, 22)",
							mr: 1,
						}}
						color="info"
						label="Filled"
						variant="outlined"
						onClick={() => router.push(url)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							fill="white"
						>
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
						</svg>
						Back
					</Button>
					<Button
						sx={{
							px: 4,
							py: 1,
							color: "white", // Changed text color to white
							fontSize: "1.3rem",
							borderRadius: "6px",
							fontWeight: "bold",
							letterSpacing: "1.7px",
							backgroundColor: "rgb(132, 204, 22)",
							mr: 1,
						}}
						color="info"
						label="Filled"
						variant="outlined"
						onClick={handleUpdatePost}
					>
						<SaveIcon sx={{ mr: 1 }} />
						Save
					</Button>
				</div>
			</FormControl>
			<Toaster />
		</div>
	);
}
