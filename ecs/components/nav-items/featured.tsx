import Link from "next/link"

export function FeaturedNavItem() {
  return (
    <Link href="/featured" className="text-gray-800 hover:text-gray-600 transition-colors">
      Featured
    </Link>
  )
}