import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const plans = await db.plan.findMany({
      orderBy: {
        price: "asc",
      },
    })

    return NextResponse.json({ plans })
  } catch (error) {
    console.error("Error fetching plans:", error)
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
    const { name, description, price, duration, features } = body

    if (!name || !price || !duration) {
      return NextResponse.json({ error: "Name, price, and duration are required" }, { status: 400 })
    }

    const plan = await db.plan.create({
      data: {
        name,
        description,
        price: Number.parseFloat(price),
        duration: Number.parseInt(duration),
        features,
      },
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error("Error creating plan:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
