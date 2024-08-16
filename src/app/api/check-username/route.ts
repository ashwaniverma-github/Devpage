import prisma from "../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options"; // Adjust the path according to your project structure

export async function POST(req: NextRequest) {
    try {
        // Get the session
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401 }
            );
        }

        const { username } = await req.json();

        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ error: "Username not available" }),
                { status: 409 } // Conflict
            );
        }

        // Update the username of the current user
        const updatedUser = await prisma.user.update({
            where: { email: session.user?.email||"" },
            data: { username },
        });

        return new NextResponse(
            JSON.stringify({ message: "Username updated successfully", user: updatedUser }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Error:", err);
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
