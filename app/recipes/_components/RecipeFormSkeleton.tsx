import { Input, Textarea } from "@nextui-org/input";
import { Button, Container, Heading } from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../recipe.css';
import './RecipeForm.css';


const RecipeFormSkeleton = () => {
  return (
    <>
<Container maxWidth="60vw" mb="8em">
      <Heading mb="8" align="center" weight="regular" style={{ color: '#EC9131' }}>
        New Recipe
      </Heading>

      <form>
        <Container mb='5'>
          <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container mb='5'>
         <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container mb='5'>
         <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container mb='5'>
         <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container mb='5'>
            <Textarea size="lg" variant="bordered"><Skeleton/></Textarea>
        </Container>

        <Container mb='5'>
            <Textarea size="lg" variant="bordered"><Skeleton/></Textarea>
        </Container>

        <Container mb='5'>
            <Textarea size="lg" variant="bordered"><Skeleton/></Textarea>
        </Container>

        <Container mb='5'>
         <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container mb='5'>
         <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container mb='5'>
         <Input variant="bordered" size="lg" type="title"><Skeleton/></Input>
        </Container>

        <Container>
            <Button
                type="submit"
                color="gray"
                variant="soft"
                radius="large"
                size='3'
                highContrast
                >Submit Recipe
              </Button>
         </Container>
    </form>
</Container>
</>
  )
}

export default RecipeFormSkeleton
