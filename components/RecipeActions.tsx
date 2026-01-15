import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import RecipeFilter from "./RecipeFilter";


const RecipeActions = () => {
  return (
    <Flex
      justify="between"
      align={{ initial: 'stretch', md: 'center' }}
      gap="4"
      mb="5"
      direction={{ initial: "column-reverse", md: "row" }}
    >
      {/* Butonul New Recipe */}
      <Button
        size="3"
        variant="solid"
        color="orange"
        highContrast
        className="cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        asChild
      >
        <Link href="/recipes/new">
          <Flex gap="2" align="center" justify="center">
            <PlusIcon width="20" height="20" />
            <span className="font-semibold">New Recipe</span>
          </Flex>
        </Link>
      </Button>

      {/* Componenta de Filtrare */}
      <Flex align="center">
        <RecipeFilter />
      </Flex>
    </Flex>
  );
};

export default RecipeActions;