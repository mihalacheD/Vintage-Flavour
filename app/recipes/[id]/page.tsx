import prisma from '@/lib/prisma'
import { Container } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions} from "@/lib/auth"
import EditRecipeButton from '@/components/EditRecipeButton'
import DeleteRecipeButton from '@/components/DeleteRecipeButton'
import AssigneeSelect from '@/components/AssigneeSelect'
import RecipeDetails from '@/components/RecipeDetails'


interface Props {
  params: Promise<{ id: string }>
}

const RecipePage = async (props: Props) => {
  const params = await props.params
  const session = await getServerSession(authOptions)

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    include: { assignedToUser: true }
  })

  if (!recipe) {notFound()}

  const isOwner = session?.user?.id === recipe.assignedToUserId;

  return (
    <div className="min-h-screen py-8">
      <Container className="max-w-5xl mx-auto px-4">
        {isOwner && (
          <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              {/* Left Side - Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <EditRecipeButton recipeId={recipe.id} />
                <DeleteRecipeButton recipeId={recipe.id} />
              </div>
              {/* Right Side - Assignee Select */}
              <div className="w-full md:w-auto md:min-w-62.5">
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