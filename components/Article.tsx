import { Container, Heading, Text } from '@radix-ui/themes'
import React from 'react'

const Article = () => {
  return (
    <Container className="my-16 mx-4">
      {/* Article Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-emerald-100 shadow-lg">

        {/* Header */}
        <div className="text-center mb-10">
          <Heading
            size={{ initial: '7', md: '9' }}
            className="text-gray-900 mb-3"
          >
            Welcome to <span className="orange">Vintage Flavour</span>
          </Heading>
          <p className="text-xl text-gray-700 font-medium great-vibes-regular">
            A Journey Through Flavors
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ec9131] to-[#79c141] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ec9131] to-[#d17b1f] rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <Text className="text-gray-700 leading-relaxed text-sm">
              Have you ever tasted something so delicious it instantly transported you to a cherished memory? That&apos;s the magic of food—a universal language that connects us all. Welcome to <span className="orange font-semibold">Vintage Flavour</span>, a cozy corner of the internet where I share my passion for cooking, baking, and creating dishes that bring people together.
            </Text>
          </div>

          {/* Card 2 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-[#79c141] to-[#5ea330] rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Why I Started This Blog?</h3>
            <Text className="text-gray-700 leading-relaxed text-sm">
              The idea for this blog was born out of my love for food and storytelling. I&apos;ve always believed that every recipe has a story—whether it&apos;s a childhood favorite, a family heirloom, or a dish inspired by travels to far-off places. Here, I&apos;ll be blending ingredients with personal anecdotes to make your cooking journey as flavorful as the dishes themselves.
            </Text>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ec9131] to-[#79c141] rounded-xl flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Join Me in the Kitchen!</h3>
            <Text className="text-gray-700 leading-relaxed text-sm">
              I hope <span className="orange font-semibold">Vintage Flavour</span> becomes your go-to resource for recipe inspiration and a space where we can connect over our shared love of food. Feel free to leave comments, share your own cooking experiences, and even request recipes you would like to see on the blog. So, grab your apron, and let&apos;s get cooking!
            </Text>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 text-gray-600 text-sm">
            <svg className="w-5 h-5 text-[#79c141]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>Made with love and passion for great food</span>
          </div>
        </div>

      </div>
    </Container>
  )
}

export default Article