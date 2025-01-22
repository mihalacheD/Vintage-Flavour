import prisma from '@/prisma/client';
import { Container, Box, Flex, Heading, Text, Blockquote, Em } from '@radix-ui/themes';
import { PiForkKnifeFill } from "react-icons/pi";
import { MdStars } from "react-icons/md";
import { IoTimerSharp } from "react-icons/io5";
import getCloudinary from '@/app/utils/getCloudinary';
import CldImage from "@/app/components/CldImage";
import { GiMeal } from "react-icons/gi";
import Link from 'next/link';
import React from 'react';
import './recipe.css';
import RecipeActions from './list/RecipeActions';
import Pagination from '../components/Pagination';
import { Metadata } from 'next';



 getCloudinary();

 const Recipes = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
  // Așteptăm rezolvarea lui searchParams
  const resolvedSearchParams = await searchParams;
  const pageSize = 5;
  const page = parseInt(resolvedSearchParams.page) || 1;

  const recipes = await prisma.recipe.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: true, // Include utilizatorul asignat
    },
  });

  const recipeCount = await prisma.recipe.count();

    // Dacă nu există rețete, afișăm un mesaj corespunzător
    if (recipes.length === 0) {
      return (
        <Container
          style={{ height: '100vh' }}
          align="center"
        >
          <Flex
            justify="center"
            align="center"
            direction="column"
            style={{ height: '100%' }}
          >
            <Text align="center" size="6" color="gray" mb='2em'>No recipes found!</Text>
            <Link href="/recipes/list" className='nav-link'>
              <Flex align="center">
                <Text ml="2">Back to Recipes</Text>
              </Flex>
            </Link>
          </Flex>
        </Container>
      );
    }

  return (
    <Container mb="8em" mt="5em">

      <Container mb="5em"  maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
        <RecipeActions/>
      </Container>

      <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
        {recipes.map((recipe) => {
          const imageUrl = recipe.imageUrl;

          return (
            <Container key={recipe.id} p="5" className="recipe-container">
              <Flex direction="column" gap="6" align="center">
                {/* Imaginea */}
                {imageUrl && (
                  <CldImage
                    className="recipe-img"
                    alt={recipe.title}
                    src={imageUrl}
                    width={500}
                    height={500}
                  />
                )}

                {/* Titlul si detalii */}
                <Container mx={{ initial: "0", md: "9" }}>
                  <Box mb='7' mx='2'>
                    <Heading size='9' align='center' weight='medium' color='gray'>{recipe.title}</Heading>
                    {recipe.assignedToUser  && (
                       <Flex justify='end' mt='4'>
                          <Blockquote size='4'>
                            <Text color="gray">by <Em>{recipe.assignedToUser.name}</Em></Text>
                          </Blockquote>
                      </Flex>
                    )}
                  </Box>

                  <Flex direction='row' mb='4' mx='2' align='end'>
                    <Text size={{ initial: '6', xs: '8' }} className='orange' mr='0.4em'>
                      <PiForkKnifeFill />
                    </Text>
                    <Text size={{ initial: '5', xs: '7' }} color='gray' mr='0.4em'>
                      Categories :
                    </Text>
                    <Text size={{ initial: '4', xs: '6' }} color='gray'>{recipe.categories}</Text>
                  </Flex>

                  <Flex direction='row' mb='4' mx='2' align='end'>
                    <Text size={{ initial: '6', xs: '8' }} className='orange' mr='0.4em'>
                      <GiMeal />
                    </Text>
                    <Text size={{ initial: '5', xs: '7' }} color='gray' mr='0.4em'>
                      Servings :
                    </Text>
                    <Text size={{ initial: '4', xs: '6' }} color='gray'>{recipe.servings}</Text>
                  </Flex>

                  <Flex direction='row' mb='4' mx='2' align='end'>
                    <Text size={{ initial: '6', xs: '8' }} className='orange' mr='0.4em'>
                      <MdStars />
                    </Text>
                    <Text size={{ initial: '5', xs: '7' }} color='gray' mr='0.4em'>
                      Difficulty :
                    </Text>
                    <Text size={{ initial: '4', xs: '6' }} color='gray'>{recipe.difficulties}</Text>
                  </Flex>

                  <Flex direction='row' mb='4' mx='2' align='end'>
                    <Text size={{ initial: '6', xs: '8' }} className='orange' mr='0.4em'>
                      <IoTimerSharp />
                    </Text>
                    <Text size={{ initial: '5', xs: '7' }} color='gray' mr='0.4em'>
                      CookTime :
                    </Text>
                    <Text size={{ initial: '4', xs: '6' }} color='gray'>{recipe.cookTime} minutes</Text>
                  </Flex>

                  <Flex direction='row' mb='4' mx='2' align='end'>
                    <Text size={{ initial: '6', xs: '8' }} className='orange' mr='0.4em'>
                      <IoTimerSharp />
                    </Text>
                    <Text size={{ initial: '5', xs: '7' }} color='gray' mr='0.4em'>
                      PrepTime :
                    </Text>
                    <Text size={{ initial: '4', xs: '6' }} color='gray'>{recipe.prepTime} minutes</Text>
                  </Flex>
                </Container>

                {/* Descrierea scurtă */}
                <Text size="7" color="gray"  mb="4">
                  {recipe.description.length > 100
                    ? `${recipe.description.substring(0, 100)}...`
                    : recipe.description}
                </Text>

                {/* Link pentru detalii */}
                  <Link href={`/recipes/${recipe.id}`} className='link'>...Read more</Link>

              </Flex>
            </Container>
          );
        })}
      </Container>
      <Pagination itemCount={recipeCount} pageSize={pageSize} currentPage={page}/>
    </Container>
  );
};

export const metadata: Metadata = {
  title: "Vintage Flavour-Recipes List",
  description: "View all recipes"
}

export default Recipes;
export const dynamic = 'force-dynamic'