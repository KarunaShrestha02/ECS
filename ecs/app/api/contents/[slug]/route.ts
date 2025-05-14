import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { content, contentId } = body

    if (!content || !contentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if the content exists
    const contentItem = await db.content.findUnique({
      where: {
        id: contentId,
      },
    })

    if (!contentItem) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Create the comment
    const comment = await db.comment.create({
      data: {
        content,
        userId: session.user.id as string,
        contentId,
        isApproved: session.user.role === "ADMIN", // Auto-approve for admin
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
