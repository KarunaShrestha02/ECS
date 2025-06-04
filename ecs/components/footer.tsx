import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4">
     
        <div className="py-8 flex justify-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
            About Us
          </Link>
          <Link href="/subscription" className="text-gray-600 hover:text-gray-900 text-sm">
            Subscription
          </Link>
          <Link href="/advertise" className="text-gray-600 hover:text-gray-900 text-sm">
            Advertise with us
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
            Contact Us
          </Link>
        </div>

        
        <div className="bg-[#1D1D1D] text-white py-4">
          <div className="container mx-auto px-1 flex justify-center items-center space-x-2">
          <Link href="/" className="flex items-center">
          <Image src="/ECS_media_logo_1 1.png" alt="ECS NEPAL" width={120} height={40} className="h-10 w-auto" />
        </Link>
            <span className="text-sm">Basundhara, Kathmandu</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

