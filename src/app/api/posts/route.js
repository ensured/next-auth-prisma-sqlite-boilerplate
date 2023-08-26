import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request, response) {
  const posts = await prisma.post.findMany();
  // console.log(request.headers.get('x-forwarded-for'))
  revalidatePath("/");
  return NextResponse.json(posts);
}
