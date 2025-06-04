import Image from "next/image"
import { Button } from "@/components/ui/button"

const issues = [
  {
    id: 1,
    title: "May 2025 Issue",
    image: "/1746083191737.jpeg?height=600&width=450",
    month: "May",
    year: "2025",
  },
  {
    id: 2,
    title: "April 2025 Issue",
    image: "/1746083162580.jpeg?height=600&width=450",
    month: "April",
    year: "2025",
  },
  {
    id: 3,
    title: "March 2025 Issue",
    image: "/1746083170964.jpeg?height=600&width=450",
    month: "March",
    year: "2025",
  },
  {
    id: 4,
    title: "February 2025 Issue",
    image: "/1746083211518.jpeg?height=600&width=450",
    month: "February",
    year: "2025",
  },
]

export function LatestIssues() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">LATEST ISSUES</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {issues.map((issue) => (
            <div key={issue.id} className="group">
              <div className="relative aspect-[3/4] border-8 border-yellow-400 overflow-hidden">
                <Image
                  src={issue.image || "/placeholder.svg"}
                  alt={issue.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 text-white">
                <div className="uppercase text-xs tracking-wider text-gray-400">Magazine</div>
                <h3 className="text-xl font-medium mt-1">
                  {issue.month} {issue.year} Issue
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Button variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-6">
            SEE ARCHIVE
          </Button>
        </div>
      </div>
    </section>
  )
}
