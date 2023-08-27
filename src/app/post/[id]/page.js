import axios from "axios";
import prisma from "@/utils/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "",
  description: "",
};

const SinglePost = async ({ params }) => {
  let session = await getServerSession();
  const postId = params.id;

  if (!session) {
    redirect("/api/auth/signin/google");
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });
    // console.log("Post #" + postId);
    const dateTime = new Date(post.createdAt);
    const convertedDate = dateTime.toLocaleString();
    metadata.title = post.title;
    metadata.description = post.authorEmail;

    const handleDelete = async () => {
      "use server";
      try {
        const deletedPost = await prisma.post.delete({
          where: {
            id: parseInt(post.id),
          },
        });
        console.log("Post deleted:", deletedPost);
        revalidatePath("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    return (
      <div className="flex justify-center bg-gray-900 min-h-screen">
        <div className="max-w-screen-lg w-full p-4 ">
          <button className="text-slate-50 px-4 py-2 rounded-md mb-4 bg-gray-600 hover:bg-gray-700">
            <Link href="/">Back</Link>
          </button>
          <form action={handleDelete}>
            <input type="submit" value="Delete" />
          </form>
          <Link href={`/post/${post.id}/edit`}>
            <div className="bg-gray-700 p-4 rounded-md mb-4 hover:bg-gray-800 cursor-pointer">
              <h3 className="text-gray-100 text-xl font-semibold mb-2">
                <div className="flex justify-between items-center">
                  {post.title}
                  <p className="text-gray-400">{post.authorEmail}</p>
                </div>
              </h3>
              <p className="text-gray-300 break-all">{post.content}</p>

              <p className="text-gray-500 mt-2 text-xs">{convertedDate}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    redirect("/");
  }
};

export default SinglePost;
