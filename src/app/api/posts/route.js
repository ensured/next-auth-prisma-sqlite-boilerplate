import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request, response) {
	const posts = await prisma.post.findMany();
	// console.log(request.headers.get('x-forwarded-for'))
	return NextResponse.json(posts);
}
