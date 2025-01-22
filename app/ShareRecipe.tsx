'use client'
import { Button, Container, Em, Flex, Heading, Text } from '@radix-ui/themes'
import {Image} from "@nextui-org/image";
import { useRouter } from 'next/navigation';
import './recipes/recipe.css';

const ShareRecipe = () => {
  const router = useRouter();
  return (
    <Container 	style={{ backgroundColor: "var(--gray-a2)", borderRadius: "var(--radius-6)" }}>
      <Flex m='4' justify='center' align='center' direction={{ initial: "column", md: "row"}}>
        <Image
           alt='recipe-img'
           src='shareRecipe.webp'
           width={500}
           />
        <Flex direction='column' m='7'>
          <Heading size='9' className='great-vibes-regular' align='center'>Share youre recipe <Em>with us</Em></Heading>
          <Text my='4' style={{ textIndent: "2em", lineHeight: "1.8", fontSize: "1.1rem"}}>Got a recipe you love? Share it with us! Inspire others with your
             favorite dishes and let your creativity shine in our community. Click
             below to submit your recipe and spread the joy of cooking!</Text>
             <Button
             variant='outline'
               size='3'
               color='orange'
               onClick={() => router.push(`/recipes/new`)}
               >Share youre recipe</Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ShareRecipe
