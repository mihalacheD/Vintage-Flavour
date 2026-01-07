'use client';
import Spinner from '@/components/Spinner';
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Container, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteRecipe = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/recipes/${recipeId}`);
      router.push('/recipes');
      router.refresh();
    } catch {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <Container size="2">
          {/* Aliniere responsivă: pe mobil ocupă tot rândul, pe desktop se aliniază la stânga */}
          <Flex direction="column" align={{ initial: 'stretch', sm: 'start' }}>
            <AlertDialog.Trigger>
              <Button
                disabled={isDeleting}
                size="3"
                variant="surface"
                color="red"
                className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                <Flex gap="2" align="center" justify="center">
                  {!isDeleting && <TrashIcon width="18" height="18" />}
                  <span className="font-medium">Delete Recipe</span>
                  {isDeleting && <Spinner />}
                </Flex>
              </Button>
            </AlertDialog.Trigger>
          </Flex>

          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure you want to delete this recipe? This action cannot be undone and the data will be permanently removed.
            </AlertDialog.Description>
            <Flex mt="4" gap="3" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray" className="cursor-pointer">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  color="red"
                  onClick={deleteRecipe}
                  className="cursor-pointer"
                >
                  Confirm Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </Container>
      </AlertDialog.Root>

      {/* Dialog pentru eroare */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title color="red">Error</AlertDialog.Title>
          <AlertDialog.Description>
            This recipe could not be deleted. Please try again later or check your connection.
          </AlertDialog.Description>
          <Flex mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={() => setError(false)}>
              Close
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteRecipeButton;