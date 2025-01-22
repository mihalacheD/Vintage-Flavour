'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, Callout, Container, Heading, Spinner, Text } from "@radix-ui/themes";
import { RecipeSchema } from '../../validationSchema';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useState } from "react";
import './RecipeForm.css'
import { z } from 'zod';
import axios from 'axios';
import { Recipe } from '@prisma/client';
import Upload_img from '@/app/components/Upload_img';



interface Props {
  recipe? : Recipe
}

type RecipeFormData = z.infer<typeof RecipeSchema>;

const RecipeForm = ({ recipe }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitted, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Salvăm URL-ul imaginii

  const { register, handleSubmit, control, formState: { errors }} = useForm<RecipeFormData>({
    resolver: zodResolver(RecipeSchema),
  });

  // Callback-ul pentru a salva URL-ul imaginii
  const onUploadSuccess = (uploadedImageUrl: string) => {
    setImageUrl(uploadedImageUrl); // Actualizăm URL-ul imaginii în formular
  };


  return (
    <Container maxWidth="60vw" mb="8em">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Heading mb="8" align="center" weight="regular" style={{ color: '#EC9131' }}>
        New Recipe
      </Heading>

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            const recipeData = { ...data, imageUrl };
            // verificam daca avem un recipe(daca avem trimitem un patch daca nu trimitem un post)
            if(recipe)
              await axios.patch('/api/recipes/' + recipe.id, recipeData)

            // Adăugăm imageUrl în datele trimise
            if (imageUrl) {
              await axios.post('/api/recipes', recipeData); // Trimiterea către backend
              router.push('/recipes');
              router.refresh();
            } else {
              setSubmitting(false);
              setError('Please upload an image before submitting.');
            }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            setSubmitting(false);
            setError('An unexpected error has occurred.');
          }
        })}
      >


        <Container mb='5'>
          <Input defaultValue={recipe?.title} variant="bordered" size="lg" type="title" aria-label="title"  placeholder="Recipe Title" {...register("title")}/>
          { errors.title && <Text color='red' as='p'>{ errors.title.message }</Text>}
        </Container>

        <Controller
               name="categories"
               control={ control }
               render={({ field }) =>
        <Container mb='5'>
              <Select
                    variant="bordered"
                    size="lg"
                    aria-label="category"
                    placeholder="Category"
                    {...field}
              >
                {categories.map((category) => (
                  <SelectItem key={category.key}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
              { errors.categories && <Text color='red' as='p'>{ errors.categories.message }</Text>}
          </Container>
           }/>

        <Controller
               name="servings"
               control={ control }
               render={({ field }) =>
        <Container mb='5'>
            <Select
                  variant="bordered"
                  size="lg"
                  aria-label="servings"
                  placeholder="Servings"
                  {...field}
            >
              {servings.map((serving) => (
              <SelectItem key={serving.key}>
                  {serving.label}
                </SelectItem>
              ))}
            </Select>
            { errors.servings && <Text color='red' as='p'>{ errors.servings.message }</Text>}
        </Container>
        }/>


        <Controller
               name="difficulties"
               control={ control }
               render={({ field }) =>
        <Container mb='5'>
            <Select
                  variant="bordered"
                  size="lg"
                  aria-label="difficulties"
                  placeholder="Difficulty"
                  {...field}
            >
              {difficulties.map((difficulty) => (
              <SelectItem key={difficulty.key}>
                  {difficulty.label}
                </SelectItem>
              ))}
            </Select>
            { errors.difficulties && <Text color='red' as='p'>{ errors.difficulties.message }</Text>}
        </Container>
         }/>

        <Container mb='5'>
            <Textarea
              {...register("description")}
              defaultValue={recipe?.description}
              placeholder="Description"
              aria-label="Description"
              size="lg"
              variant="bordered"
            />
            { errors.description && <Text color='red' as='p'>{ errors.description.message }</Text>}
        </Container>

        <Container mb='5'>
            <Textarea
              {...register("ingredients")}
              defaultValue={recipe?.ingredients}
              placeholder="Enter each ingredient on a new line"
              aria-label="Ingredients"
              size="lg"
              variant="bordered"
            />
            { errors.ingredients && <Text color='red' as='p'>{ errors.ingredients.message }</Text>}
        </Container>

        <Container mb='5'>
            <Textarea
              {...register("instructions")}
              defaultValue={recipe?.instructions}
              placeholder="Enter cooking instructions"
              aria-label="Intructions"
              size="lg"
              variant="bordered"
            />
            { errors.instructions && <Text color='red' as='p'>{ errors.instructions.message }</Text>}
        </Container>

        <Container mb='5'>
          <Input defaultValue={recipe?.cookTime}variant="bordered" size="lg" aria-label="cookTime"  placeholder="Cook Time (HH:MM)"{...register("cookTime")}/>
          { errors.cookTime && <Text color='red' as='p'>{ errors.cookTime.message }</Text>}
        </Container>

        <Container mb='5'>
          <Input defaultValue={recipe?.prepTime} variant="bordered" size="lg" aria-label="prepTime" placeholder="Prep Time (HH:MM)"{...register("prepTime")}/>
          { errors.prepTime && <Text color='red' as='p'>{ errors.prepTime.message }</Text>}
        </Container>

        <Container mb='5'>
           <Upload_img onUploadSuccess={onUploadSuccess}/>
        </Container>

        <Container>
            <Button
                disabled={isSubmitted}
                type="submit"
                color="gray"
                variant="soft"
                radius="large"
                size='3'
                highContrast
                >
                {recipe ? "Update Recipe" : "Submit Recipe"}
                     {" "}
                {isSubmitted && <Spinner/>}
              </Button>
         </Container>
    </form>
</Container>
 )
}



const categories = [
  { key: "Breakfast", label: "Breakfast"},
  { key: "Lunch", label: "Lunch"},
  { key: "Dinner", label: "Dinner"},
  { key: "Appetizer", label: "Appetizer"},
  { key: "Salad", label: "Salad"},
  { key: "Main-course", label: "Main-course"},
  { key: "Side-dish", label: "Side-dish"},
  { key: "Dessert", label: "Dessert"},
  { key: "Christmas", label: "Christmas"},
];

const servings = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  label: `${i + 1}`, // Textul care apare în listă
}));

const difficulties =[
   { key: "Easy", label: "Easy"},
   { key: "Medium", label: "Medium"},
   { key: "Hard", label: "Hard"},
]
export default RecipeForm;
