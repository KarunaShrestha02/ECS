import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { checkUserSubscription } from "@/lib/subscription"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get("category")
    const isPremium = searchParams.get("premium") === "true"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const session = await getServerSession(authOptions)
    const isSubscribed = session?.user ? await checkUserSubscription(session.user.id as string) : false

    const where: any = {
      isApproved: true,
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      }
    }

    if (isPremium) {
      where.isPremium = true
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

    // Filter premium content for non-subscribed users
    const filteredContents = contents.map((content) => {
      if (content.isPremium && !isSubscribed) {
        return {
          ...content,
          content: "This content is only available to subscribers.",
        }
      }
      return content
    })

    return NextResponse.json({
      contents: filteredContents,
      pagination: {
        total: totalContents,
        page,
        limit,
        pages: Math.ceil(totalContents / limit),
      },
      userHasAccess: isSubscribed,
    })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, slug, description, content, categoryId, isPremium } = body

    const newContent = await db.content.create({
      data: {
        title,
        slug,
        description,
        content,
        categoryId,
        isPremium: !!isPremium,
        isApproved: true, // Auto-approve for admin
      },
    })

    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
