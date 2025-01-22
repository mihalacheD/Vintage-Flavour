import prisma from '@/prisma/client';
import { Box, Container, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import '../recipe.css';
import EditRecipeButton from './EditRecipeButton';
import RecipeDetails from './RecipeDetails';
import DeleteRecipeButton from './DeleteRecipeButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOption';
import AssigneeSelect from './AssigneeSelect';

interface Props{
  params: Promise<{ id :string }>
}

 const RecipePage = async (props: Props) => {

  const params = await props.params;

  const session = await getServerSession(authOptions)

   const recipe = await prisma.recipe.findUnique({
     where: { id: params.id}
   });

   if (!recipe){
    notFound()
   }

   return (
     <Container mb='5em' mt='5em'>
      { session && (
        <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
          <Flex  justify='between' align='baseline' direction={{ initial: "column-reverse", md: "row"}}>
            <Box>
              <EditRecipeButton recipeId={recipe.id}/>
              <DeleteRecipeButton recipeId={recipe.id}/>
            </Box>
            <Box mr='3'>
              <AssigneeSelect recipe={recipe}/>
            </Box>
          </Flex>
        </Container>
      )}
       <RecipeDetails recipe={recipe}/>
     </Container>
   )
 };


export default RecipePage;
