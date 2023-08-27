import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function GET(request, response) {
	let x = request.url;
	const id = x.slice(x.lastIndexOf("/") + 1);

	// let session = await getServerSession();
	// if (!session) {
	// 	return NextResponse.redirect("/api/auth/signin/google");
	// }

	const post = await prisma.post.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	return NextResponse.json({ post });
}
