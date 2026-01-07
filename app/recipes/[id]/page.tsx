import prisma from '@/lib/prisma'
import { Container } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import '../recipe.css'
import EditRecipeButton from '../../../components/EditRecipeButton'
import RecipeDetails from '../../../components/RecipeDetails'
import DeleteRecipeButton from '../../../components/DeleteRecipeButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/utils/authOption'
import AssigneeSelect from '../../../components/AssigneeSelect'

interface Props {
  params: Promise<{ id: string }>
}

const RecipePage = async (props: Props) => {
  const params = await props.params
  const session = await getServerSession(authOptions)

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
  })

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8">
      <Container className="max-w-5xl mx-auto px-4">

        {/* Admin Controls - Only visible when authenticated */}
        {session && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              {/* Left Side - Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <EditRecipeButton recipeId={recipe.id} />
                <DeleteRecipeButton recipeId={recipe.id} />
              </div>

              {/* Right Side - Assignee Select */}
              <div className="w-full md:w-auto md:min-w-[250px]">
                <AssigneeSelect recipe={recipe} />
              </div>
            </div>
          </div>
        )}

        {/* Recipe Content */}
        <RecipeDetails recipe={recipe} />

      </Container>
    </div>
  )
}

export default RecipePage