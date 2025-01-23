import Image from "next/image"
import Link from "next/link"

export function FeaturedGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">FEATURED</h2>

        <div className="grid grid-cols-6 grid-rows-[300px_200px_200px] gap-4">
          {/* First row - Large image with text */}
          <div className="col-span-4 row-span-1 relative group">
            <Link href="/featured/dances">
              <div className="relative h-full w-full">
                <Image
                  src="/Rectangle 7.jpg"
                  alt="Dances Through Time"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Dances Through Time</h3>
                    <p className="text-sm leading-relaxed opacity-90 line-clamp-3">
                      It is a long established fact that a reader will be distracted by the readable content of a page
                      when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                      distribution of letters, as opposed to using Content here, content here, making it look like
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* First row - Two smaller images */}
          <div className="col-span-1 row-span-1 relative">
            <Image
              src="/Rectangle 8.jpg"
              alt="Traditional Mask"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1 relative">
            <Image
              src="/Rectangle 9.jpg"
              alt="Stupa"
              fill
              className="object-cover"
            />
          </div>

          {/* Second row */}
          <div className="col-span-2 row-span-2 relative">
            <Image
              src="/Rectangle 10.jpg"
              alt="Traditional Costume"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-2 row-span-1 relative">
            <Image
              src="/Rectangle 11.jpg"
              alt="Decorative Art"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-2 row-span-2 relative">
            <Image
              src="/Rectangle 12.jpg"
              alt="Evening Scene"
              fill
              className="object-cover"
            />
          </div>

          {/* Third row */}
          <div className="col-span-2 row-span-1 relative">
            <Image
              src="/Rectangle 13.jpg"
              alt="Lake View"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t">
          <h2 className="text-xl font-semibold">CURRENT ISSUE</h2>
        </div>
      </div>
    </section>
  )
}