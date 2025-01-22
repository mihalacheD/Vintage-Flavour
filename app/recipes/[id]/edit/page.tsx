import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import RecipeForm from '../../_components/RecipeForm';

interface Props{
  params: Promise<{ id :string }>
}

const EditRecipe = async (props: Props) => {
  const params = await props.params;

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id}
  });

  if (!recipe){
   notFound()
  }

  return (
      <RecipeForm recipe={recipe}/>
  )
}

export default EditRecipe
