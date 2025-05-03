import Image from "next/image"
import Link from "next/link"

export function SisterPublications() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg mb-12">Our sister publications</h3>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <Link href="#" className="block">
              <Image
                src="/wedding bells bitmap 1.png?height=50&width=150"
                alt="Wedding Bells"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <Link href="#" className="block">
              <Image
                src="/livingnew logo 1.png?height=50&width=150"
                alt="Living"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <Link href="#" className="block">
              <Image
                src="/Friday logo.png?height=50&width=150"
                alt="Friday logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <Link href="#" className="block">
              <Image
                src="/Build logo.png?height=50&width=150"
                alt="Build logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
