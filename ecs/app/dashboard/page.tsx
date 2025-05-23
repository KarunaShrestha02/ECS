"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import NavBar from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, CreditCard, User } from "lucide-react"

interface Subscription {
  id: string
  status: string
  startDate: string
  endDate: string
  plan: {
    id: string
    name: string
    price: number
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (status === "authenticated") {
      fetchSubscription()
    }
  }, [status, router])

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/subscription")
      const data = await response.json()

      if (response.ok) {
        setSubscription(data.subscription)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching subscription:", error)
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) {
      return
    }

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      })

      if (response.ok) {
        alert("Subscription cancelled successfully")
        fetchSubscription()
      } else {
        const data = await response.json()
        alert(data.error || "Failed to cancel subscription")
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      alert("An error occurred while cancelling your subscription")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    )
  }

  // Safe access to user properties
  const userName = session?.user?.name || "User"
  const userEmail = session?.user?.email || ""

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {userName}!</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Your personal information and account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">Name</label>
                      <p className="text-gray-900">{userName || "Not provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                      <p className="text-gray-900">{userEmail}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="mr-2">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Subscription Details
                  </CardTitle>
                  <CardDescription>Manage your subscription and billing information</CardDescription>
                </CardHeader>
                <CardContent>
                  {subscription ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Current Plan</label>
                          <p className="text-gray-900 font-medium">{subscription.plan.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Status</label>
                          <p
                            className={`font-medium capitalize ${
                              subscription.status === "active" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {subscription.status}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Start Date</label>
                          <div className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
                            <p className="text-gray-900">{new Date(subscription.startDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Expiry Date</label>
                          <div className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
                            <p className="text-gray-900">{new Date(subscription.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex">
                        {subscription.status === "active" ? (
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={handleCancelSubscription}
                          >
                            Cancel Subscription
                          </Button>
                        ) : (
                          <Button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => router.push("/subscription")}
                          >
                            Renew Subscription
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">You don't have an active subscription.</p>
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => router.push("/subscription")}
                      >
                        View Subscription Plans
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  )
}
