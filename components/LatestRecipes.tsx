import prisma from '@/lib/prisma'
import { Container, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import CldImage from '@/components/CldImage'


const LatestRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  })

  return (
    <Container>
      {/* Section Header */}
      <div className="text-center mb-10 mt-16">
        <Heading size="9" className="great-vibes-regular text-gray-800">
          Your everyday <span className="text-brand-orange">inspiration</span>
        </Heading>
        <p className="text-gray-600 text-sm mt-2">
          Discover our latest culinary creations
        </p>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 mb-16">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-56 bg-gray-200">
              <CldImage
                alt={recipe.title}
                src={recipe.imageUrl!}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* New Badge */}
              <div className="absolute top-3 left-3 bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                NEW
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col grow">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-medium">
                  {recipe.categories}
                </span>
              </div>

              {/* Title */}
              <Heading
                size="4"
                className="orange mb-3 group-hover:text-[#d17b1f] transition-colors line-clamp-2"
              >
                {recipe.title}
              </Heading>

              {/* Description */}
              <Text
                color="gray"
                size="2"
                className="mb-4 grow line-clamp-3"
              >
                {recipe.description}
              </Text>

              {/* Read More Link */}
              <div className="mt-auto">
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="inline-flex items-center text-brand-green hover:text-brand-green/80 font-medium text-sm transition-colors group/link"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default LatestRecipes
export const dynamic = 'force-dynamic'
export const revalidate = 3