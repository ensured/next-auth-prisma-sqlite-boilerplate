import EditPost from "@/components/EditPost";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getRelativeTimeAgo } from "@/components/Ago";
const page = async ({ params }) => {
	try {
		const postId = params.id;
		const post = await prisma.post.findUnique({
			where: {
				id: parseInt(postId),
			},
		});
		revalidatePath("/post/" + params.id);

		const createdAt = getRelativeTimeAgo(post.createdAt);
		const updatedAt = getRelativeTimeAgo(post.updatedAt);

		return (
			<EditPost
				initialTitle={post.title}
				initialContent={post.content}
				postId={post.id}
				createdAt={createdAt}
				updatedAt={updatedAt}
			/>
		);
	} catch (error) {
		redirect("/post/" + params.id);
	}
};

export default page;
