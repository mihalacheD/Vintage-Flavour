import CldImage from "@/components/CldImage"
import { Recipe, User } from '../app/generated/prisma/client'
import { Blockquote, Em, Heading, Text } from '@radix-ui/themes'
import { GiMeal } from "react-icons/gi"
import { IoTimerSharp } from "react-icons/io5"
import { MdStars } from "react-icons/md"

type RecipeWithUser = Recipe & {
  assignedToUser: User | null;
};

const RecipeDetails = async ({ recipe }: { recipe: RecipeWithUser }) => {


  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Hero Image */}
      {recipe.imageUrl && (
        <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
          <CldImage
            alt={recipe.title}
            src={recipe.imageUrl}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-brand-green text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {recipe.categories}
            </span>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="p-8 md:p-12">

        {/* Title & Author */}
        <div className="text-center mb-10">
          <Heading
            size="9"
            className="text-gray-900"
          >
            {recipe.title}
          </Heading>
          <div className="mt-4">
          {recipe.assignedToUser && (
            <Blockquote size="3" className="text-gray-600">
              by <Em className="text-brand-orange font-semibold">{recipe.assignedToUser.name}</Em>
            </Blockquote>
          )}
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

          <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center text-white">
                <GiMeal size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Servings</p>
                <p className="text-lg font-bold text-gray-900">{recipe.servings}</p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white">
                <MdStars size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Difficulty</p>
                <p className="text-lg font-bold text-gray-900">{recipe.difficulties}</p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <IoTimerSharp size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Prep Time</p>
                <p className="text-lg font-bold text-gray-900">{recipe.prepTime}m</p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                <IoTimerSharp size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Cook Time</p>
                <p className="text-lg font-bold text-gray-900">{recipe.cookTime}m</p>
              </div>
            </div>
          </div>

        </div>

        {/* Description Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-linear-to-r from-brand-orange to-brand-green rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Description</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Text size="5" className="text-gray-700 leading-relaxed">
              {recipe.description}
            </Text>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-linear-to-r from-brand-orange to-brand-green rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
          </div>
          <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
            <ul className="space-y-3">
              {recipe.ingredients.split("\n").map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand-green text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <Text size="4" className="text-gray-700 flex-1">
                    {ingredient}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-linear-to-r from-brand-orange to-brand-green rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
          </div>
          <div className="space-y-4">
            {recipe.instructions.split("\n").map((instruction, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-l-4 border-brand-green shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-linear-to-br from-brand-green to-[#5ea330] text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {index + 1}
                  </div>
                  <Text size="4" className="text-gray-700 leading-relaxed flex-1 pt-1">
                    {instruction}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default RecipeDetails