export function HeroSection() {
    return (
      <div className="relative h-screen w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/pexels-julia-volk-6118897.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <span className="text-white text-sm tracking-wider mb-4 block">
              EXCLUSIVE STORY
            </span>
            <h1 className="text-white text-5xl sm:text-6xl font-bold mb-4">
              Paths to Paradise
            </h1>
            <p className="text-white text-xl mb-8">
              Embracing places you have never been before.
            </p>
            <button className="text-white border border-white px-6 py-2 hover:bg-white hover:text-gray-900 transition-colors">
              Read More
            </button>
          </div>
        </div>
      </div>
    )
  }