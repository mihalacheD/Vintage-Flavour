import { Container, Heading, Text, Badge } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import '../recipe.css'
import CldImage from '@/components/CldImage'
import Image from 'next/image'

const ChristmasPage = async () => {
  const recipes = await prisma.recipe.findMany({
    where: {
      categories: 'Christmas',
    },
    include: {
      assignedToUser: true,
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-green-50 py-12">
      <Container className="max-w-7xl mx-auto px-4">

        {/* Header Section */}
        <div className="text-center mb-12">

          {/* Christmas Decorations */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <Image
              alt="christmas decoration"
              src="/christmas-sm.png"
              width={50}
              height={50}
              className="animate-bounce"
            />
            <Image
              alt="christmas decoration"
              src="/christmas-sm.png"
              width={60}
              height={60}
            />
            <Image
              alt="christmas decoration"
              src="/christmas-sm.png"
              width={50}
              height={50}
              className="animate-bounce"
            />
          </div>

          {/* Title */}
          <Heading
            size="9"
            className="text-red-700 mb-4 great-vibes-regular"
          >
            Christmas Recipes
          </Heading>

          {/* Subtitle */}
          <div className="max-w-2xl mx-auto">
            <Text size="4" className="text-gray-700 leading-relaxed block">
              Look no further for Christmas recipes and dinner ideas. Get into the spirit with festive treats,
              homemade presents, and create the perfect holiday menu for your loved ones.
            </Text>
          </div>

          {/* Decorative snowflakes */}
          <div className="flex justify-center gap-3 mt-6 text-3xl">
            <span className="animate-pulse">❄️</span>
            <span className="animate-pulse delay-100">🎄</span>
            <span className="animate-pulse delay-200">⭐</span>
            <span className="animate-pulse">❄️</span>
          </div>
        </div>

        {/* Recipe Count Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-red-100 border border-red-200 text-red-800 px-6 py-2 rounded-full font-semibold text-sm">
            🎁 {recipes.length} Festive Recipes Available
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-red-100 h-full flex flex-col">

                {/* Image */}
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <CldImage
                    alt={recipe.title}
                    src={recipe.imageUrl || ''}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Candy Decoration */}
                  <div className="absolute top-4 left-4">
                    <Image
                      alt="candy decoration"
                      src="/candy.png"
                      width={40}
                      height={40}
                      className="drop-shadow-lg"
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      color="red"
                      className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                    >
                      🎅 Holiday Special
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">

                  {/* Title */}
                  <Heading
                    size="5"
                    className="orange mb-3 group-hover:text-red-600 transition-colors line-clamp-2"
                  >
                    {recipe.title}
                  </Heading>

                  {/* Description */}
                  <Text
                    size="2"
                    className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                  >
                    {recipe.description}
                  </Text>

                  {/* Author */}
                  {recipe.assignedToUser && (
                    <p className="text-xs text-gray-500 mb-3">
                      by <span className="font-semibold text-gray-700">{recipe.assignedToUser.name}</span>
                    </p>
                  )}

                  {/* Read More */}
                  <div className="flex items-center text-red-600 font-medium text-sm group-hover:gap-2 transition-all mt-auto pt-3 border-t border-gray-100">
                    <span>View Recipe</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎄</div>
            <Text size="5" className="text-gray-600 mb-2 block">
              No Christmas recipes yet!
            </Text>
            <Text size="3" className="text-gray-500">
              Check back soon for festive holiday recipes.
            </Text>
          </div>
        )}

      </Container>
    </div>
  )
}

export default ChristmasPage
export const dynamic = 'force-dynamic'