import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    console.log("User does exist:", user.email);
    return NextResponse.json({ exists: true });
  } else {
    console.log("User does not exist");
    return NextResponse.json({ exists: false });
  }
}
