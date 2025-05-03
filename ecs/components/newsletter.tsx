import { Button } from "@/components/ui/button"

export function Newsletter() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg mb-6">Stay in touch</h3>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <Button
              type="submit"
              variant="outline"
              className="px-8 py-2 border-black text-black hover:bg-black hover:text-white"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
