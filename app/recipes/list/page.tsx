import prisma from '@/prisma/client'
import React from 'react'
import RecipeDetails from '../[id]/RecipeDetails';
import { Container, Flex, Link, Text } from '@radix-ui/themes';
import RecipeActions from './RecipeActions';
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Pagination from '@/app/components/Pagination';

const page = async ({ searchParams }:  { searchParams: Promise<{ categories?: string, page: string }> }) => {
  // Așteptăm ca searchParams să fie rezolvat
  const resolvedSearchParams = await searchParams;

  const { categories } = resolvedSearchParams;

  const page = parseInt(resolvedSearchParams.page) || 1;
  const pageSize = 5;

  // Dacă "categories" nu este specificat sau este "All", aducem toate rețetele
  const recipes = categories && categories !== "All"
    ? await prisma.recipe.findMany({
        where: {
          categories: categories,
        },
        skip: (page -1 ) * pageSize,
        take: pageSize
      })
    : await prisma.recipe.findMany({
      skip: (page -1 ) * pageSize,
      take: pageSize
    });

    const recipeCount = await prisma.recipe.count({
      where: { categories }
    })

    if (recipes.length === 0) {
      return (
        <Container
          style={{ height: '100vh' }} // Setează înălțimea containerului pe 100% din înălțimea ferestrei
          align="center"
        >
          <Flex
            justify="center"
            align="center"
            direction="column"
            style={{ height: '100%' }} // Asigură-te că flex-ul ocupă întreaga înălțime disponibilă
          >
            <Text align="center" size="6" color="gray" mb='2em'>No recipes found for this category!</Text>
            <Link href="/recipes/list" className='nav-link' >
                 <Flex align="center">
                       <ArrowLeftIcon />
                       <Text ml="2">Back</Text>
                 </Flex>
            </Link>
          </Flex>
        </Container>
      );
    }


   return (
    <Container mb="8em" mt="5em">
    <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
      <RecipeActions/>
      {recipes.map((recipe) => (
          <RecipeDetails key={recipe.id} recipe={recipe} />
        ))}
        <Pagination itemCount={recipeCount} pageSize={pageSize} currentPage={page}/>
    </Container>
    </Container>
  );
}

export default page;
