"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import NavBar from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  price: number
  duration: number
  features: string[]
  popular?: boolean
}

export default function SubscriptionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    fetchPlans()
  }, [status, router])

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/admin/plans")
      const data = await response.json()

      if (response.ok) {
        // Add popular flag to the most expensive plan
        const plansWithPopular = data.plans.map((plan: Plan, index: number, array: Plan[]) => {
          if (index === 1 || (array.length === 1 && index === 0)) {
            return { ...plan, popular: true }
          }
          return plan
        })

        setPlans(plansWithPopular)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching plans:", error)
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      router.push("/login")
      return
    }

    setSubscribing(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Failed to create checkout session")
        setSubscribing(false)
      }
    } catch (error) {
      console.error("Error subscribing:", error)
      alert("An error occurred while processing your subscription")
      setSubscribing(false)
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

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Subscription Plans</h2>
            <p className="mt-4 text-xl text-gray-600">Choose the perfect plan for your needs</p>
          </div>

          {plans.length === 0 ? (
            <div className="mt-12 text-center">
              <p className="text-gray-500">No subscription plans available at the moment.</p>
            </div>
          ) : (
            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-lg shadow-sm divide-y divide-gray-200 ${
                    plan.popular ? "border-indigo-500 ring-2 ring-indigo-500" : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-indigo-500 text-white text-center py-1 text-sm font-semibold">Most Popular</div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-4">
                      <span className="text-4xl font-extrabold text-gray-900">${plan.price.toFixed(2)}</span>
                      <span className="text-base font-medium text-gray-500">
                        {plan.duration === 30 ? "/mo" : plan.duration === 365 ? "/year" : ""}
                      </span>
                    </p>
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={subscribing}
                      className={`mt-8 block w-full py-2 px-4 rounded-md shadow ${
                        plan.popular
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {subscribing ? "Processing..." : "Subscribe"}
                    </Button>
                  </div>
                  <div className="pt-6 pb-8 px-6">
                    <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex">
                          <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                          <span className="ml-3 text-base text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
