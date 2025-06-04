"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, AlignJustify } from "lucide-react"

const magazines = [
  {
    id: 1,
    title: "",
    category: "MAGAZINE",
    image: "/WhatsApp Image 2025-04-29 at 5.40.09 PM.jpeg?height=600&width=400",
    year: "1907",
  },
  {
    id: 2,
   title: "",
    category: "SCIENCE",
    image: "/1746083151543.jpeg?height=600&width=400",
    year: "2022",
  },
  {
    id: 3,
    title: "",
    category: "TECHNOLOGY",
    image: "/1746083239788.jpg?height=600&width=400",
    year: "2023",
  },
  {
    id: 4,
    title: "",
    category: "ASTRONOMY",
    image: "/1746083176421.jpeg?height=600&width=400",
    year: "2021",
  },
  {
    id: 5,
    title: "",
    category: "PHYSICS",
    image: "/1746083223403.jpeg?height=600&width=400",
    year: "2020",
  },
]

export function MagazineSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % magazines.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + magazines.length) % magazines.length)
  }

  // Calculate indices for visible slides
  const getVisibleIndices = () => {
    const indices = []
    const totalSlides = magazines.length

    // Add previous 2 slides
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalSlides) % totalSlides
      indices.push(index)
    }

    return indices
  }

  const visibleIndices = getVisibleIndices()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative h-[600px] overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-black hover:text-yellow-400 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-black hover:text-yellow-400 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Magazine Slides */}
          <div className="relative h-full flex items-center justify-center">
            {visibleIndices.map((index, i) => {
              const magazine = magazines[index]
              const isCenter = i === 2

              // Calculate position and z-index based on position relative to center
              const position = i - 2
              const zIndex = isCenter ? 10 : 5 - Math.abs(position)
              const opacity = isCenter ? 1 : 0.7 - Math.abs(position) * 0.2
              const scale = isCenter ? 1 : 0.8 - Math.abs(position) * 0.1
              const translateX = position * (isCenter ? 0 : 200)

              return (
                <div
                  key={magazine.id}
                  className="absolute transition-all duration-500 ease-in-out"
                  style={{
                    zIndex,
                    opacity,
                    transform: `translateX(${translateX}px) scale(${scale})`,
                  }}
                >
                  <div className="relative w-[320px] h-[480px] bg-gray-900">
                    <Image
                      src={magazine.image || "/placeholder.svg"}
                      alt={magazine.title}
                      fill
                      className="object-cover"
                    />

                    {isCenter && (
                      <div className="absolute inset-0 flex flex-col items-center text-white p-6">
                        <div className="mt-12 text-center">
                          <span className="text-sm tracking-wider mb-2 block">{magazine.category}</span>
                          <div className="w-12 h-1 bg-yellow-400 mx-auto my-4"></div>
                          <h2 className="text-2xl font-bold mb-4 px-6">{magazine.title}</h2>
                        </div>

                        <div className="mt-auto mb-8 text-center">
                          <Button
                            variant="default"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8"
                          >
                            <AlignJustify className="w-4 h-4 mr-2" />
                            READ
                          </Button>
                          <div className="mt-4 text-gray-400">{magazine.year}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
