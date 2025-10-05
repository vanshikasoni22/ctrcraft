import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return Response.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch user data with thumbnails
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        credits: true,
        thumbnails: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            prompt: true,
            imageUrl: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
