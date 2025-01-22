import { Container, Button, Box, Flex, Heading, Text } from '@radix-ui/themes';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { GiMeal } from 'react-icons/gi';
import { IoTimerSharp } from 'react-icons/io5';
import { MdStars } from 'react-icons/md';
import { PiForkKnifeFill } from 'react-icons/pi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './recipe.css';

const LoadingRecipePage = () => {

  const recipes = [
    { id: 1, imageUrl: null, title: "Recipe-title", category: null },
    { id: 2, imageUrl: null, title: "Recipe-title", category: null },
  ];

  return (
    <>
      <Container mb="8em" mt="5em">
        <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
          <Button size="4" variant="outline" color="gray" mb="8" mt="3" ml="2">
            <Link href="/recipes/new">New recipe</Link>
          </Button>
        </Container>

        <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
          {recipes.map((recipe) => {
            return (
              <Container key={recipe.id} p="5" className="recipe-container">
                <Flex direction="column" gap="6" align="center">
                    {/* Afișare imagine */}
                    {!recipe.imageUrl ? (
                      <Skeleton height={300} width={300} className="recipe-img-skeleton" />
                    ) : (
                      <CldImage
                        className="recipe-img"
                        alt={recipe.title}
                        src={recipe.imageUrl}
                        width={500}
                        height={500}
                      />
                    )}

                    <Container mx={{ initial: '0', md: '9' }}>
                      <Box mb="7" mx="2">
                        <Heading size="9" align="center" weight="medium" color="gray">
                          <Skeleton/>
                        </Heading>
                      </Box>

                      <Flex direction="row" mb="4" mx="2" align="end">
                        <Text size={{ initial: '6', xs: '8' }} className="orange" mr="0.4em">
                          <PiForkKnifeFill />
                        </Text>
                        <Text size={{ initial: '5', xs: '7' }} color="gray" mr="0.4em">
                          Categories:
                        </Text>
                        <Text size={{ initial: '4', xs: '6' }} color="gray">
                          <Skeleton height={40} width={200}/>
                        </Text>
                      </Flex>

                      <Flex direction="row" mb="4" mx="2" align="end">
                        <Text size={{ initial: '6', xs: '8' }} className="orange" mr="0.4em">
                          <GiMeal />
                        </Text>
                        <Text size={{ initial: '5', xs: '7' }} color="gray" mr="0.4em">
                          Servings:
                        </Text>
                        <Text size={{ initial: '4', xs: '6' }} color="gray">
                        <Skeleton height={40} width={200}/>
                        </Text>
                      </Flex>

                      <Flex direction="row" mb="4" mx="2" align="end">
                        <Text size={{ initial: '6', xs: '8' }} className="orange" mr="0.4em">
                          <MdStars />
                        </Text>
                        <Text size={{ initial: '5', xs: '7' }} color="gray" mr="0.4em">
                          Difficulty:
                        </Text>
                        <Text size={{ initial: '4', xs: '6' }} color="gray">
                        <Skeleton height={40} width={200}/>
                        </Text>
                      </Flex>

                      <Flex direction="row" mb="4" mx="2" align="end">
                        <Text size={{ initial: '6', xs: '8' }} className="orange" mr="0.4em">
                          <IoTimerSharp />
                        </Text>
                        <Text size={{ initial: '5', xs: '7' }} color="gray" mr="0.4em">
                          CookTime:
                        </Text>
                        <Text size={{ initial: '4', xs: '6' }} color="gray">
                          <Skeleton height={40} width={200}/>
                        </Text>
                      </Flex>

                      <Flex direction="row" mb="4" mx="2" align="end">
                        <Text size={{ initial: '6', xs: '8' }} className="orange" mr="0.4em">
                          <IoTimerSharp />
                        </Text>
                        <Text size={{ initial: '5', xs: '7' }} color="gray" mr="0.4em">
                          PrepTime:
                        </Text>
                        <Text size={{ initial: '4', xs: '6' }} color="gray">
                          <Skeleton height={40} width={200}/>
                        </Text>
                      </Flex>
                    </Container>

                        <Text size="7" align="center">
                          <Skeleton height={40} width={400}/>
                        </Text>


                    <Link href={`/recipes/${recipe.id}`} className='link'>...Read more</Link>

                    </Flex>
              </Container>
            );
          })}
        </Container>
      </Container>
    </>
  );
};

export default LoadingRecipePage;