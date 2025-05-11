"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"

export function NavBar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Safe access to role property
  const userRole = session?.user?.role

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/ecs logo 1.png" // Update with your actual logo path
            alt="ECS NEPAL Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/magazine" className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 transition-colors">
            Magazine
          </Link>
          <Link href="/featured" className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 transition-colors">
            Featured
          </Link>
          <Link href="/content" className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 transition-colors">
            Articles
          </Link>
          <Link href="/contact" className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 transition-colors">
            Contact
          </Link>

          {session ? (
            <div className="relative group">
              <Button variant="ghost" className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 flex items-center">
                <User className="w-4 h-4 mr-2" />
                {session.user?.name || "Account"}
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </Link>
                {userRole === "ADMIN" && (
                  <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" className="text-[#1D1B4B] hover:text-[#1D1B4B]/80" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link
              href="/magazine"
              className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Magazine
            </Link>
            <Link
              href="/featured"
              className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Featured
            </Link>
            <Link
              href="/content"
              className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/contact"
              className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {userRole === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                  className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-[#1D1B4B] hover:text-[#1D1B4B]/80 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

// Make sure to add this default export
export default NavBar
