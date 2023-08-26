import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { authOptions } from "../auth/[...nextauth]";

export async function POST(request, response) {
  let session = await getServerSession();
  // let session = await getServerSession(authOptions)
  console.log(session);

  if (!session) {
    return NextResponse.redirect("/api/auth/signin/google");
  }

  const { title, content } = await request.json();
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorEmail: session.user.email,
    },
  });
  revalidatePath("/");
  return NextResponse.json({ message: "Post created", post });
}
