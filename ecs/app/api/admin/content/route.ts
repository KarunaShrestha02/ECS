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

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where: any = {}

    if (status === "approved") {
      where.isApproved = true
    } else if (status === "pending") {
      where.isApproved = false
    }

    const contents = await db.content.findMany({
      where,
      include: {
        category: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    const totalContents = await db.content.count({ where })

    return NextResponse.json({
      contents,
      pagination: {
        total: totalContents,
        page,
        limit,
        pages: Math.ceil(totalContents / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { id, isApproved, isPremium, title, description, content, categoryId } = body

    if (!id) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
    }

    const updateData: any = {}

    if (isApproved !== undefined) updateData.isApproved = isApproved
    if (isPremium !== undefined) updateData.isPremium = isPremium
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (content) updateData.content = content
    if (categoryId) updateData.categoryId = categoryId

    const updatedContent = await db.content.update({
      where: {
        id,
      },
      data: updateData,
    })

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
