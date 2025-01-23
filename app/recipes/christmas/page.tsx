import { Card, Container, Em, Flex, Grid, Heading,Inset,Link,Text } from '@radix-ui/themes'
import {Image} from "@nextui-org/image";
import prisma from '@/prisma/client';
import '../recipe.css';



const recipes = await prisma.recipe.findMany({
   where: {
    categories: "Christmas",
  },
  include: {
    assignedToUser: true
  }
})

const page = () => {
  return (
    <Container mx='4'>

      <Flex justify='center'align='center' gap='4'>
      <Image alt='christmas' src='../christmas-sm.png'></Image>
      <Image alt='christmas' src='../christmas-sm.png'></Image>
      <Image alt='christmas' src='../christmas-sm.png'></Image>
      </Flex>

      <Heading size='9' weight='medium' align='center' color='bronze' my='7'><Em>Christmas</Em> recipes</Heading>
      <Text size='5' color='gray' mx='4'>Look no further for Christmas recipes and dinner ideas. Get into the spirit with Christmas food like mulled wine and mince pies, make homemade presents, and create the perfect Christmas menu.</Text>
      <Grid columns={ { initial: "1", md: "3"}} gap="8" width="auto" height='auto' my='9'>
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
               <Image alt='christmas' src='../candy.png'></Image>
          </Flex>
          <Heading my='3' className='orange'>{recipe.title}</Heading>
          <Text color='gray'>{recipe.description}</Text>
          <Container style={{ position : "absolute", bottom: "0", right: "2em"}}>
            <Link href={`/recipes/${recipe.id}`} className='link'>...Read more</Link>
          </Container>
        </Card>
      ))}
    </Grid>
    </Container>
  )
}

export default page;
export const dynamic = 'force-dynamic'

