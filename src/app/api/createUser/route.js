import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function POST(request) {
    const { name, email } = await request.json();

    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });

    return NextResponse.json({ message: 'User created', user });

}
