"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    image: string
  }
}

interface ContentDetail {
  id: string
  title: string
  slug: string
  description: string
  content: string
  image: string
  isPremium: boolean
  category: {
    name: string
    slug: string
  }
  comments: Comment[]
  createdAt: string
  userHasAccess: boolean
}

export default function ContentDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [content, setContent] = useState<ContentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [params.slug])

  const fetchContent = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/content/${params.slug}`)
      const data = await response.json()

      if (response.ok) {
        setContent(data)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      router.push("/login")
      return
    }

    if (!comment.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          contentId: content?.id,
        }),
      })

      if (response.ok) {
        setComment("")
        alert("Comment submitted for approval!")
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading article...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!content) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Article not found</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {content.image && (
              <div className="relative h-64 sm:h-96">
                <Image
                  src={content.image || "/placeholder.svg?height=600&width=1200"}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
                {content.isPremium && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded">
                    PREMIUM
                  </div>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{content.category.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(content.createdAt).toLocaleDateString()}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>

              <p className="text-lg text-gray-700 mb-6">{content.description}</p>

              {content.isPremium && !content.userHasAccess ? (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 my-8">
                  <div className="flex flex-col items-center text-center">
                    <Lock className="h-12 w-12 text-indigo-500 mb-4" />
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">Premium Content</h3>
                    <p className="text-indigo-600 mb-4">This content is only available to subscribers.</p>
                    <Button
                      onClick={() => router.push("/subscription")}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
              )}

              {/* Comments Section */}
              <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

                {session ? (
                  <form onSubmit={handleSubmitComment} className="mb-8">
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Add a comment
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Comment"}
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">Comments will be visible after approval.</p>
                  </form>
                ) : (
                  <div className="mb-8 bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">
                      Please{" "}
                      <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        sign in
                      </Link>{" "}
                      to leave a comment.
                    </p>
                  </div>
                )}

                {content.comments.length > 0 ? (
                  <div className="space-y-6">
                    {content.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {comment.user.image ? (
                              <Image
                                src={comment.user.image || "/placeholder.svg"}
                                alt={comment.user.name || "User"}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            ) : (
                              <span className="text-gray-500 font-medium">{comment.user.name?.charAt(0) || "U"}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{comment.user.name || "Anonymous"}</h4>
                            <span className="ml-2 text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
