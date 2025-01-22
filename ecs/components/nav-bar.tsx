import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-14 py-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/ecs logo 1.png" // Replace with the correct path to your logo
            alt="ECS NEPAL Logo"
            width={160} // Slightly larger logo
            height={50}
            className="h-14 w-auto"
          />
        </Link>

        {/* Center: Separate Text Container */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center pb-2">
          <div className="flex space-x-12 items-center">
            <Link
              href="/magazine"
              className="text-[#1D1B4B] text-sm font-medium hover:text-[#1D1B4B]/80 transition-colors relative group"
            >
              Magazine
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#1D1B4B] scale-x-100 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link
              href="/featured"
              className="text-[#1D1B4B] text-sm font-medium hover:text-[#1D1B4B]/80 transition-colors relative group"
            >
              Featured
            </Link>
            <Link
              href="/archive"
              className="text-[#1D1B4B] text-sm font-medium hover:text-[#1D1B4B]/80 transition-colors relative group"
            >
              Archive
            </Link>
            <Link
              href="/contact"
              className="text-[#1D1B4B] text-sm font-medium hover:text-[#1D1B4B]/80 transition-colors relative group"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right: Login Button */}
        <Button
          variant="ghost"
          className="text-[#1D1B4B] text-sm font-medium hover:text-[#1D1B4B]/80 flex items-center"
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
