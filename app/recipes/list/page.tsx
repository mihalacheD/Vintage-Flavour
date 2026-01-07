import prisma from '@/lib/prisma';
import React from 'react'
import RecipeDetails from '../../../components/RecipeDetails';
import { Container, Flex, Link, Text, Box, Heading, Button } from '@radix-ui/themes';
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Pagination from '@/components/Pagination';
import RecipeActions from '@/components/RecipeActions';
import { Recipe } from '@prisma/client';

const page = async ({ searchParams }: { searchParams: Promise<{ categories?: string, page: string }> }) => {

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
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    : await prisma.recipe.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    });

  const recipeCount = await prisma.recipe.count({
    where: { categories }
  })

  if (recipes.length === 0) {
    return (
      <Container size="3">
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{ minHeight: '70vh' }}
          gap="5"
        >
          {/* Element Vizual/Iconiță */}
          <Box
            style={{
              backgroundColor: 'var(--orange-2)',
              padding: '40px',
              borderRadius: '50%',
              color: '#EC9131'
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2h18M3 22h18M4 7h16M7 22V7M17 22V7M10 7v4M14 7v4" />
              <circle cx="12" cy="15" r="3" />
            </svg>
          </Box>

          <Flex direction="column" align="center" gap="2">
            <Heading size="7" align="center" weight="bold">
              No recipes found
            </Heading>
            <Text size="4" color="gray" align="center" style={{ maxWidth: '400px' }}>
              We couldn&apos;t find any recipes in the <Text weight="bold" color="orange">{categories}</Text> category. Why not try another one?
            </Text>
          </Flex>

          <Link href="/recipes/list" style={{ textDecoration: 'none' }}>
            <Button
              size="3"
              variant="soft"
              color="orange"
              highContrast
              style={{ cursor: 'pointer', borderRadius: '12px', paddingLeft: '32px', paddingRight: '32px' }}
            >
              <ArrowLeftIcon />
              Explore all recipes
            </Button>
          </Link>
        </Flex>
      </Container>
    );
  }


  return (
    <Container mb="8em" mt="5em">
      <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
        <RecipeActions />
        {recipes.map((recipe: Recipe) => (
          <RecipeDetails key={recipe.id} recipe={recipe} />
        ))}
        <Pagination itemCount={recipeCount} pageSize={pageSize} currentPage={page} />
      </Container>
    </Container>
  );
}

export default page;
