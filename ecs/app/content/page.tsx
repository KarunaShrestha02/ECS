"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import NavBar from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface Content {
  id: string
  title: string
  slug: string
  description: string
  image: string
  isPremium: boolean
  category: {
    name: string
    slug: string
  }
  createdAt: string
}

interface Pagination {
  total: number
  page: number
  limit: number
  pages: number
}

export default function ContentListPage() {
  const { data: session } = useSession()
  const [contents, setContents] = useState<Content[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userHasAccess, setUserHasAccess] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchContents(currentPage)
  }, [currentPage])

  const fetchContents = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/content?page=${page}&limit=6`)
      const data = await response.json()

      if (response.ok) {
        setContents(data.contents)
        setPagination(data.pagination)
        setUserHasAccess(data.userHasAccess)
      }
    } catch (error) {
      console.error("Error fetching contents:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Articles</h2>
            <p className="mt-4 text-xl text-gray-600">Discover the latest stories and insights</p>
          </div>

          {!userHasAccess && (
            <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-indigo-500 mr-2" />
                <p className="text-indigo-700">
                  Some content is only available to subscribers.{" "}
                  <Link href="/subscription" className="font-medium underline hover:text-indigo-800">
                    Subscribe now
                  </Link>{" "}
                  to access all content.
                </p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="mt-12 flex justify-center">
              <p>Loading articles...</p>
            </div>
          ) : (
            <>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {contents.map((content) => (
                  <div key={content.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-shrink-0 relative h-48">
                      <Image
                        src={content.image || "/placeholder.svg?height=300&width=400"}
                        alt={content.title}
                        fill
                        className="object-cover"
                      />
                      {content.isPremium && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                          PREMIUM
                        </div>
                      )}
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-600">{content.category.name}</p>
                        <Link href={`/content/${content.slug}`}>
                          <h3 className="mt-2 text-xl font-semibold text-gray-900 hover:underline">{content.title}</h3>
                        </Link>
                        <p className="mt-3 text-base text-gray-500 line-clamp-3">{content.description}</p>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <span className="sr-only">Date</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-500">{new Date(content.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="mr-2"
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {pagination.pages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === pagination.pages}
                      className="ml-2"
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
