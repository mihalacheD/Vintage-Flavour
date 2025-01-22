'use client'
import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Container, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const DeleteRecipeButton = ({ recipeId }: { recipeId: string} ) => {

  const router = useRouter();

  const [ error, setError ] = useState(false);

  const [ isDeleting, setDeleting ] = useState(false)

  const deleteRecipe = async () => {
    try {
      //throw new Error();
      setDeleting(true)
      await axios.delete(`/api/recipes/${recipeId}`);
      router.push('/recipes');
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch ( error ) {
      setDeleting(false)
      setError(true)
    }
  }

  return (
    <>
  <AlertDialog.Root>
    <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
      <AlertDialog.Trigger>
        <Button disabled={isDeleting} size='4' variant='outline' color='red' mb='3' mt='3' ml='2'>
              Delete Recipe
              {isDeleting && <Spinner/>}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Delition</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this recipe?
          This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
                color='red'
                onClick={deleteRecipe}
                >Delete Recipe</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      </Container>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
      <AlertDialog.Title>Error</AlertDialog.Title>
      <AlertDialog.Description>
        This recipe could not be deleted.
      </AlertDialog.Description>
      <Button color='gray' onClick={() => {
        setError(false)
      }}>
        OK
      </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
      </>
  )
}

export default DeleteRecipeButton
