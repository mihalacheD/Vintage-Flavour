import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Container } from '@radix-ui/themes';
import Link from 'next/link';

const EditRecipeButton = ({ recipeId }: { recipeId: string} ) => {
  return (
    <>
    <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
      <Button size='4' variant='outline' color='gray' mb='3' mt='3' ml='2'>
        <Pencil2Icon/>
        <Link href={`/recipes/${recipeId}/edit`}>Edit Recipe</Link>
      </Button>
      </Container>
      </>
  )
}

export default EditRecipeButton
