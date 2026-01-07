import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';

const EditRecipeButton = ({ recipeId }: { recipeId: string }) => {
  return (
    <Container size="2">
      <Flex direction="column" align={{ initial: 'stretch', sm: 'start' }}>
        <Button
          size="3"
          variant="surface"
          color="bronze"
          highContrast
          className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          asChild
        >
          <Link href={`/recipes/${recipeId}/edit`}>
            <Flex gap="2" align="center" justify="center">
              <Pencil2Icon width="18" height="18" />
              <span className="font-medium tracking-wide">Edit Recipe</span>
            </Flex>
          </Link>
        </Button>
      </Flex>
    </Container>
  );
};

export default EditRecipeButton;