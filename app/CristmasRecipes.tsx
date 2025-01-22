'use client'
import { Button, Em, Section, Text, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import './recipes/recipe.css';

const CristmasRecipes = () => {
    const router = useRouter();
  return (
    <Section
       height='100%'
       my='9'
       style={{ backgroundImage: "url('/christmas.webp')", backgroundPosition: "right"}}>
      <Flex align='center' justify='between' px='8'>
          <Text size='9' color='bronze'style={ {textShadow: " 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)"}} >Christmas <Em>Recipes</Em> Collection</Text>
      <Button
           variant='surface'
           size='4'
           color='bronze'
           onClick={() => router.push(`/recipes/christmas`)}
           >
            Get Recipes
      </Button>
      </Flex>
    </Section>
  )
}

export default CristmasRecipes
