import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(request, response) {
	const { title, content, id } = await request.json();
	const updatedPost = await prisma.post.update({
		where: {
			id: parseInt(id),
		},
		data: {
			title,
			content,
		},
	});
	revalidatePath("/post/" + id);
	return NextResponse.json({ message: "Post created", updatedPost });
}
