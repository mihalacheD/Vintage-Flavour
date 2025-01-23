import CldImage from "@/app/components/CldImage";
import { Recipe } from '@prisma/client';
import { Blockquote, Box, Container, Em, Flex, Heading, Text } from '@radix-ui/themes';
import { GiMeal } from "react-icons/gi";
import { IoTimerSharp } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";
import '../../recipes/recipe.css'
import prisma from "@/prisma/client";



const RecipeDetails = async ({ recipe }: { recipe: Recipe}) => {

  const recipeUserName = await prisma.recipe.findUnique({
    where: { id: recipe.id },
    include: {
      assignedToUser: true, // Include utilizatorul asignat
    },
  });


  return (
  <Container mb="8em" mt="5em">
    <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
          <Container key={recipe.id} p='5' className='recipe-container'>
            <Flex direction='column' gap="6" align="center">
                {/* Afișează imaginea folosind imageUrl */}
                {recipe.imageUrl && (
                  <div>
                    <CldImage
                      className="recipe-img"
                      alt={recipe.title}
                      src={recipe.imageUrl}
                      width={500}
                      height={500}
                    />
                  </div>
                )}

                <Container mx={{ initial: "0", md: "9" }}>
                  <Box mb='7' mx='2'>
                    <Heading size='9' align='center' weight='medium' color='gray' wrap='wrap'>{recipe.title}</Heading>
                    {recipeUserName?.assignedToUser  && (
                       <Flex justify='end' mt='4'>
                          <Blockquote size='4'>
                            <Text color="gray">by <Em>{recipeUserName.assignedToUser.name}</Em></Text>
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
              </Flex>

              <Flex gap='4' direction='column' mt='6' mb='6'>
                <Text as='p' size='7' className='section-title'>Description :</Text>
                <Box mb='3' mx='5' className='recipe-details'>
                  <Text as='p' size='6' wrap='balance' color='gray'>{recipe.description}</Text>
                </Box>

                <Text size='7' className='section-title'>Ingredients :</Text>
                <Box mb='3' mx='5' className='recipe-details'>
                  <Text size='6' wrap='balance' color='gray'>
                    <ul style={{ listStyle: "initial", listStylePosition: "inside" }}>
                      {recipe.ingredients.split("\n").map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </Text>
                </Box>

                <Text as='p' size='7' className='section-title'>Instruction :</Text>
                <Box mb='3' mx='5' className='recipe-details'>
                <Text size='6' wrap='balance' color='gray'>
                    <ol style={{ listStyle: "decimal", listStylePosition: "inside" }}>
                      {recipe.instructions.split("\n").map((instruction, index) => (
                        <li key={index} style={{ marginBottom: "1rem" }}>{instruction}</li>
                      ))}
                    </ol>
                  </Text>
                </Box>
              </Flex>
          </Container>
    </Container>
  </Container>
  )
}

export default RecipeDetails
