import { db } from "@/lib/db"

export async function checkUserSubscription(userId: string): Promise<boolean> {
  const subscription = await db.subscription.findUnique({
    where: {
      userId,
    },
  })

  if (!subscription) {
    return false
  }

  const now = new Date()
  return subscription.status === "active" && new Date(subscription.endDate) > now
}
