import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NavBar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-[#1D1B4B] text-2xl font-bold">
          ECS NEPAL
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link href="/magazine" className="text-gray-800 hover:text-gray-600">
              Magazine
            </Link>
            <Link href="/featured" className="text-gray-800 hover:text-gray-600">
              Featured
            </Link>
            <Link href="/archive" className="text-gray-800 hover:text-gray-600">
              Archive
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600">
              Contact
            </Link>
          </div>
          <Button variant="ghost" className="text-gray-800 hover:text-gray-600">
            Login
          </Button>
        </div>
      </div>
    </nav>
  )
}