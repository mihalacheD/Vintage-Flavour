'use client'
import { Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ShareRecipe = () => {
  const router = useRouter()

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">

          <div className="grid md:grid-cols-2 gap-0">

            {/* Left Side - Image */}
            <div className="relative h-64 md:h-auto overflow-hidden bg-linear-to-br from-orange-100 to-amber-100">
              <Image
                width={300}
                height={300}
                alt="Share your recipe"
                src="/shareRecipe.webp"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay decoration */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

              {/* Floating badge */}
              <div className="absolute top-6 right-6 bg-linear-to-r from-brand-orange to-[#d17b1f] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ✨ Share Now
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">

              {/* Icon */}
              <div className="w-16 h-16 bg-linear-to-br from-brand-orange to-[#d17b1f] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>

              {/* Heading */}
              <Heading
                size="8"
                className="great-vibes-regular text-gray-900 mb-4"
              >
                Share your recipe <span className="text-brand-orange">with us</span>
              </Heading>

              {/* Description */}
              <Text className="text-gray-600 leading-relaxed mb-6 text-base">
                Got a recipe you love? Share it with us! Inspire others with your favorite dishes and let your creativity shine in our community. Click below to submit your recipe and spread the joy of cooking!
              </Text>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Easy submission process</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Join our cooking community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Get featured on our platform</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/recipes/new')}
                className="group bg-linear-to-r from-brand-orange to-[#d17b1f] text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Share Your Recipe</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ShareRecipe