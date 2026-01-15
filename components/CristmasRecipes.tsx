'use client'

import { useRouter } from 'next/navigation'

const ChristmasRecipes = () => {
  const router = useRouter()

  return (
    <div className="my-16 mx-4">
      {/* Christmas Banner */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl min-h-75 md:min-h-100"
        style={{
          backgroundImage: "url('/christmas.webp')",
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-red-900/80 via-red-800/60 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-12 md:py-16 gap-8">

          {/* Left Side - Text */}
          <div className="text-center md:text-left max-w-2xl">
            {/* Decorative snowflakes */}
            <div className="flex gap-3 justify-center md:justify-start mb-4">
              <span className="text-3xl animate-pulse">❄️</span>
              <span className="text-3xl animate-pulse delay-100">🎄</span>
              <span className="text-3xl animate-pulse delay-200">❄️</span>
            </div>

            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 great-vibes-regular"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)',
              }}
            >
              Christmas <span className="text-red-200">Recipes</span> Collection
            </h2>

            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Discover festive recipes perfect for your holiday celebrations. From traditional favorites to creative new dishes!
            </p>

            {/* Stats */}
            <div className="flex gap-6 justify-center md:justify-start text-white/90 text-sm mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>20+ Recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Easy & Quick</span>
              </div>
            </div>
          </div>

          {/* Right Side - Button */}
          <div className="shrink-0">
            <button
              onClick={() => router.push('/recipes/christmas')}
              className="group bg-white hover:bg-red-50 text-red-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-red-200 transition-all duration-300 hover:scale-105 border-2 border-red-100"
            >
              <span className="flex items-center gap-3">
                <span>Get Recipes</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            {/* Decorative badge */}
            <div className="mt-4 text-center">
              <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                🎁 Limited Holiday Edition
              </span>
            </div>
          </div>

        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-white/20 text-8xl pointer-events-none">
          🎅
        </div>
        <div className="absolute bottom-4 left-4 text-white/20 text-6xl pointer-events-none">
          🎁
        </div>
      </div>
    </div>
  )
}

export default ChristmasRecipes