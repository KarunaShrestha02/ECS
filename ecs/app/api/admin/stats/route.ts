import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [usersCount, contentCount, pendingCommentsCount] = await Promise.all([
      db.user.count(),
      db.content.count(),
      db.comment.count({
        where: {
          isApproved: false,
        },
      }),
    ])

    return NextResponse.json({
      users: usersCount,
      content: contentCount,
      pendingComments: pendingCommentsCount,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
