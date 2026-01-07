import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { Container, Text } from '@radix-ui/themes'
import { MdStars } from "react-icons/md"
import { IoTimerSharp } from "react-icons/io5"
import getCloudinary from '@/utils/getCloudinary'
import CldImage from "@/components/CldImage"
import { GiMeal } from "react-icons/gi"
import Link from 'next/link'
import React from 'react'
import Pagination from '../../components/Pagination'
import { Metadata } from 'next'
import RecipeActions from '@/components/RecipeActions'

type RecipeWithUser = Prisma.RecipeGetPayload<{
  include: { assignedToUser: true }
}>

getCloudinary()

const Recipes = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
  const resolvedSearchParams = await searchParams
  const pageSize = 5
  const page = parseInt(resolvedSearchParams.page) || 1

  const recipes = await prisma.recipe.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: true,
    },
  })

  const recipeCount = await prisma.recipe.count()

  // Empty state
  if (recipes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <Text size="6" className="text-gray-600 mb-4 block">No recipes found!</Text>
          <Link href="/recipes/list" className="text-[#79c141] hover:text-[#5ea330] font-medium">
            ← Back to Recipes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <Container className="max-w-7xl mx-auto px-4">

        {/* Actions Bar */}
        <div className="mb-12">
          <RecipeActions />
        </div>

        {/* Recipes Grid */}
        <div className="space-y-8 mb-12">
          {recipes.map((recipe: RecipeWithUser) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="block group"
            >
              <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">

                <div className="grid md:grid-cols-5 gap-0">

                  {/* Image - 2 columns */}
                  <div className="md:col-span-2 relative h-64 md:h-auto bg-gray-200 overflow-hidden">
                    {recipe.imageUrl && (
                      <CldImage
                        alt={recipe.title}
                        src={recipe.imageUrl}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#79c141] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {recipe.categories}
                      </span>
                    </div>
                  </div>

                  {/* Content - 3 columns */}
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col">

                    {/* Title & Author */}
                    <div className="mb-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#79c141] transition-colors">
                        {recipe.title}
                      </h2>
                      {recipe.assignedToUser && (
                        <p className="text-gray-600 text-sm">
                          by <span className="orange font-semibold">{recipe.assignedToUser.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
                      {recipe.description.length > 150
                        ? `${recipe.description.substring(0, 150)}...`
                        : recipe.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <GiMeal className="text-xl orange flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Servings</p>
                          <p className="text-sm font-bold text-gray-900">{recipe.servings}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdStars className="text-xl orange flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Difficulty</p>
                          <p className="text-sm font-bold text-gray-900">{recipe.difficulties}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <IoTimerSharp className="text-xl orange flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Prep</p>
                          <p className="text-sm font-bold text-gray-900">{recipe.prepTime}m</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <IoTimerSharp className="text-xl orange flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Cook</p>
                          <p className="text-sm font-bold text-gray-900">{recipe.cookTime}m</p>
                        </div>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center text-[#79c141] font-medium group-hover:gap-2 transition-all">
                      <span>Read full recipe</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>

                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <Pagination itemCount={recipeCount} pageSize={pageSize} currentPage={page} />

      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Vintage Flavour-Recipes List",
  description: "View all recipes"
}

export default Recipes
export const dynamic = 'force-dynamic'