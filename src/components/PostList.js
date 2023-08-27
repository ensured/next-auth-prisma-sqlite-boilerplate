"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getRelativeTimeAgo } from "./Ago";
const PostList = ({ posts, Btn }) => {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div className="flex justify-center items-center bg-gray-900">
			<div className="max-w-screen-lg w-full p-4">
				{posts.length > 0 || session ? (
					<ul className="bg-gray-900 rounded-md">
						<div
							id="topNav"
							className="flex justify-between items-center"
						>
							<span className="text-gray-100 text-xl font-semibold mb-4">
								Posts
							</span>
							<div className="inline-flex">{Btn}</div>
						</div>

						{posts.map((post) => (
							<li
								key={post.id}
								className="bg-gray-800 p-4 rounded-md mb-4 hover:bg-gray-700 cursor-pointer"
								onClick={() => router.push(`/post/${post.id}`)}
							>
								<div className="pb-6 ">
									<h3 className="text-gray-100 text-xl font-semibold mb-2">
										{post.title}
									</h3>
									<p className="text-gray-300 line-clamp-3 break-all">
										{post.content}
									</p>
								</div>

								<p className="text-gray-500 mt-2 text-xs">
									{createdAt(post.createdAt)}
								</p>
								<p className="text-gray-500 mt-2 text-xs">
									{lastUpdatedAt(post.updatedAt)}
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

const createdAt = (date) => {
	const createdAt = getRelativeTimeAgo(date);
	return `created ${createdAt}`;
};
const lastUpdatedAt = (date) => {
	const lastUpdatedAt = getRelativeTimeAgo(date);
	return `last updated: ${lastUpdatedAt}`;
};

export default PostList;
