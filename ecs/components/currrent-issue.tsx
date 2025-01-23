import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function CurrentIssue() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          

          <div className="relative">
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Magazine Cover */}
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <Image
                src="/image.jpg"
                alt="ECS Nepal Current Issue"
                fill
                className="object-cover"
              />
            </div>

            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-gray-400 hover:text-gray-600">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Order Button */}
          <Button variant="outline" className="mt-8 px-8 py-2 border-black text-black hover:bg-black hover:text-white">
            Order Now
          </Button>
        </div>
      </div>
    </section>
  )
}

