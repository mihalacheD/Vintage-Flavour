'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Heading, Text, Box } from '@radix-ui/themes';
import Image from 'next/image';
import { Input, Textarea } from '@heroui/input';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';

import { Recipe } from '../app/generated/prisma/client';
import { RecipeSchema } from '@/utils/validationSchema';
import Upload_img from './Upload_img';
import Spinner from './Spinner';
import { cleanRecipeData } from '@/utils/formatText';

interface Props {
  recipe?: Recipe;
}

type RecipeFormData = z.infer<typeof RecipeSchema>;

const categories = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Dessert", "Christmas"];
const difficulties = ["Easy", "Medium", "Hard"];
const servingsOptions = ["1", "2", "4", "6", "8", "10", "12+"];

const RecipeForm = ({ recipe }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(recipe?.imageUrl || null);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<RecipeFormData>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: recipe ? {
      ...recipe,
      categories: recipe.categories as RecipeFormData['categories'],
      difficulties: recipe.difficulties as RecipeFormData['difficulties'],
      servings: String(recipe.servings),
      prepTime: recipe.prepTime || "00:00",
      cookTime: recipe.cookTime || "00:00",
    } : {
      categories: undefined,
      difficulties: undefined,
      servings: "",
      prepTime: "00:00",
      cookTime: "00:00",
    }
  });

  useEffect(() => {
    if (imageUrl) {
      setValue('imageUrl', imageUrl, { shouldValidate: true });
    }
  }, [imageUrl, setValue]);

  const selectedCategory = useWatch({ control, name: 'categories' });
  const selectedDifficulty = useWatch({ control, name: 'difficulties' });
  const selectedServings = useWatch({ control, name: 'servings' });

  const onSubmit = async (data: RecipeFormData) => {
    try {
      setSubmitting(true);
      setError('');
      const payload = {
        ...data,
        title: data.title.trim(),
        description: data.description.trim(),
        ingredients: cleanRecipeData(data.ingredients),
        instructions: cleanRecipeData(data.instructions),
      };
      if (recipe) {
        await axios.patch(`/api/recipes/${recipe.id}`, payload);
      } else {
        await axios.post('/api/recipes', payload);
      }
      router.push('/recipes');
      router.refresh();
    } catch {
      setError('A server error occurred. Please check all fields.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:py-8 sm:px-4">
      <Container size="3">
        <Box className="bg-white rounded-3xl sm:rounded-4xl shadow-xl border border-gray-200 overflow-hidden">

          {/* Header - Responsive text sizes */}
          <Box className="bg-linear-to-r from-brand-orange to-[#d97e1f] px-6 py-8 sm:px-8 sm:py-10 text-center">
            <Heading size={{ initial: "6", sm: "7" }} className="text-white mb-2 font-bold">
              {recipe ? "Edit Recipe" : "Create New Recipe"}
            </Heading>
            <Text className="text-white/90 text-sm sm:text-lg block">
              {recipe ? "Update your recipe details" : "Share your culinary creation"}
            </Text>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 md:p-12 space-y-8 sm:space-y-10">

            {/* Error Messages */}
            {(error || Object.keys(errors).length > 0) && (
              <div className="p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl">
                {error && <p className="font-bold text-sm mb-1">{error}</p>}
                <ul className="list-disc ml-5 space-y-1">
                  {Object.values(errors).map((err, i) => (
                    <li key={i} className="text-xs sm:text-sm">{err?.message as string}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-gray-600">Recipe Title</label>
              <Input
                variant="bordered"
                size="lg"
                placeholder="e.g., Chocolate Chip Cookies"
                classNames={{
                  inputWrapper: "rounded-xl sm:rounded-2xl border-2 border-gray-200 h-12 sm:h-14",
                  input: "text-base sm:text-lg"
                }}
                {...register('title')}
                isInvalid={!!errors.title}
              />
            </div>

            {/* Category Selection - Scrollable or Wrapped */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-gray-600">Category</label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setValue('categories', cat as RecipeFormData['categories'], { shouldValidate: true })}
                    className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border-2 transition-all font-semibold text-xs sm:text-sm ${selectedCategory === cat
                      ? "bg-brand-orange border-brand-orange text-white shadow-md scale-105"
                      : "bg-white border-gray-300 text-gray-700 hover:border-brand-orange"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {/* Servings */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase text-gray-600">Servings</label>
                <div className="flex flex-wrap gap-2">
                  {servingsOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setValue('servings', s, { shouldValidate: true })}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 flex items-center justify-center transition-all font-bold text-sm sm:text-base ${selectedServings === s
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase text-gray-600">Difficulty</label>
                <div className="flex gap-2 sm:gap-3">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setValue('difficulties', d as RecipeFormData['difficulties'], { shouldValidate: true })}
                      className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 font-bold text-xs sm:text-sm transition-all ${selectedDifficulty === d
                        ? "bg-orange-50 border-brand-orange text-brand-orange"
                        : "bg-white border-gray-300 text-gray-600"
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-gray-600">Prep (HH:MM)</label>
                <Input placeholder="00:15" variant="bordered" size="lg"
                  classNames={{ inputWrapper: "rounded-xl border-2 h-12 sm:h-14" }}
                  {...register('prepTime')} isInvalid={!!errors.prepTime}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-gray-600">Cook (HH:MM)</label>
                <Input placeholder="01:30" variant="bordered" size="lg"
                  classNames={{ inputWrapper: "rounded-xl border-2 h-12 sm:h-14" }}
                  {...register('cookTime')} isInvalid={!!errors.cookTime}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase text-gray-600 tracking-wide">Description</label>
              <Textarea
                placeholder="Brief overview of the dish..."
                variant="bordered"
                minRows={4}
                disableAutosize={false}
                classNames={{
                  base: "w-full",
                  inputWrapper: "rounded-2xl border-2 border-gray-200 hover:border-gray-400 focus-within:border-brand-orange h-auto min-h-[120px] p-4",
                  input: "text-base resize-none py-0"
                }}
                {...register('description')}
                isInvalid={!!errors.description}
              />
            </div>

            {/* Ingredients & Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-gray-600">Ingredients</label>
                <Textarea
                  placeholder="2 cups flour..."
                  variant="bordered"
                  classNames={{
                    inputWrapper: "rounded-xl border-2 border-gray-200 p-3 sm:p-4 min-h-[200px] sm:min-h-[250px]",
                    input: "text-sm sm:text-base font-mono resize-none"
                  }}
                  {...register('ingredients')}
                  isInvalid={!!errors.ingredients}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-gray-600">Instructions</label>
                <Textarea
                  placeholder="1. Preheat..."
                  variant="bordered"
                  classNames={{
                    inputWrapper: "rounded-xl border-2 border-gray-200 p-3 sm:p-4 min-h-[200px] sm:min-h-[250px]",
                    input: "text-sm sm:text-base resize-none"
                  }}
                  {...register('instructions')}
                  isInvalid={!!errors.instructions}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-gray-600">Recipe Photo</label>
              {imageUrl ? (
                <div className="relative w-full aspect-4/3 sm:aspect-video rounded-xl overflow-hidden border-2">
                  <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                  <button type="button" onClick={() => setImageUrl(null)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 sm:p-10">
                  <Upload_img onUploadSuccess={setImageUrl} />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="4"
                className="w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: '#EC9131', color: 'white' }}
              >
                {isSubmitting ? <Spinner /> : (recipe ? '✓ Update Recipe' : '+ Create Recipe')}
              </Button>
            </div>

          </form>
        </Box>
      </Container>
    </div>
  );
};

export default RecipeForm;