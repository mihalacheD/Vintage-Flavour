import { User, Recipe } from '@/app/generated/prisma/client'
import { MdStars } from "react-icons/md"
import { IoTimerSharp } from "react-icons/io5"
import { GiMeal } from "react-icons/gi"
import CldImage from "@/components/CldImage"
import Link from 'next/link'

type RecipeWithUser = Recipe & {
  assignedToUser: User | null;
};

const RecipeCard = ({ recipe }: { recipe: RecipeWithUser }) => {
  return (
      <Link
        href={`/recipes/${recipe.id}`}
        className="block group"
      >
        <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-5 gap-0">

            {/* Imagine */}
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
              <div className="absolute top-4 left-4">
                <span className="bg-brand-green text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {recipe.categories}
                </span>
              </div>
            </div>

            {/* Conținut */}
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                  {recipe.title}
                </h2>
                {recipe.assignedToUser && (
                  <p className="text-gray-600 text-sm">
                    by <span className="text-brand-orange font-semibold">{recipe.assignedToUser.name}</span>
                  </p>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed grow">
                {recipe.description.length > 150
                  ? `${recipe.description.substring(0, 150)}...`
                  : recipe.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <GiMeal className="text-xl text-brand-orange shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Servings</p>
                    <p className="text-sm font-bold text-gray-900">{recipe.servings}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MdStars className="text-xl text-brand-orange shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Difficulty</p>
                    <p className="text-sm font-bold text-gray-900">{recipe.difficulties}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IoTimerSharp className="text-xl text-brand-orange shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Prep</p>
                    <p className="text-sm font-bold text-gray-900">{recipe.prepTime}m</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IoTimerSharp className="text-xl text-brand-orange shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Cook</p>
                    <p className="text-sm font-bold text-gray-900">{recipe.cookTime}m</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-brand-green font-medium group-hover:gap-2 transition-all">
                <span>Read full recipe</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default RecipeCard;