import RecipeForm from '@/components/RecipeForm';
import prisma from '@/lib/prisma';;
import { notFound } from 'next/navigation';


interface Props {
  params: Promise<{ id: string }>
}

const EditRecipe = async (props: Props) => {
  const params = await props.params;

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id }
  });

  if (!recipe) {
    notFound()
  }

  return (
    <RecipeForm recipe={recipe} />
  )
}

export default EditRecipe
