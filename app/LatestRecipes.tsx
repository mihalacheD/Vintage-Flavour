import prisma from '@/prisma/client'
import { Card, Container, Em, Flex, Heading, Inset, Text } from '@radix-ui/themes'
import {Image} from "@nextui-org/image";
import './recipes/recipe.css';
import React from 'react'
import Link from 'next/link';

const LatestRecipes = async () => {

const recipes = await prisma.recipe.findMany({
  orderBy : {createdAt: "desc"},
  take: 4,
  include: {
    assignedToUser: true
  }
})

  return (
    <Container>
    <Heading mx='1' align='center' color='gray' size= '9' className='great-vibes-regular'>Your everyday <Em>inspiration</Em></Heading>
    <Flex direction={{ initial: 'column', md: 'row'}} gap='7' my='9' mx='4'>
      { recipes.map( recipe => (
        <Card key={recipe.id} size='4'>
          <Inset clip="padding-box" side="top" pb="0" >
            <Image
            isZoomed
            alt='recipe-img'
            src={recipe.imageUrl!}
            />
          </Inset>
          <Flex my='2' gap='4' direction='row' align='center'>
               <Image alt='new' src='new50.png'></Image>
               <Text color='bronze'>{recipe.categories}</Text>
          </Flex>
          <Heading my='3' className='orange'>{recipe.title}</Heading>
          <Text color='gray'>{recipe.description}</Text>
          <Container style={{ position : "absolute", bottom: "0", right: "2em"}}>
            <Link href={`/recipes/${recipe.id}`} className='link'>...Read more</Link>
          </Container>
        </Card>
      ))}
    </Flex>
    </Container>
  )
}

export default LatestRecipes
