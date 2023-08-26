import EditPost from "@/components/EditPost";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
	try {
		const postId = params.id;
		console.log(parseInt(postId));
		const post = await prisma.post.findUnique({
			where: {
				id: parseInt(postId),
			},
		});
		return (
			// place to update post
			<div className="flex justify-center  bg-slate-600 min-h-screen">
				<div className="max-w-screen-lg w-full p-4">
					<EditPost
						initialTitle={post.title}
						initialContent={post.content}
						postId={post.id}
					/>
				</div>
			</div>
		);
	} catch (error) {
		redirect("/post/" + params.id);
	}
};

export default page;
