import { z } from 'zod';

export const RecipeSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  categories: z.enum(["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Dessert", "Christmas" ]),
  servings: z.string(),
  difficulties: z.enum(["Easy", "Medium", "Hard"]),
  description: z.string().min(1, "Description is required.").max(65535),
  ingredients: z.string().min(1, "Ingredients are required.").max(65535),
  instructions: z.string().min(1, "Instructions are required.").max(65535),
  cookTime: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM."),
  prepTime: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM."),
  imageUrl: z.string().optional().nullable(),
  imageBase64: z.string().optional(),
});

export const patchRecipeSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  categories: z.enum(["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Dessert", "Christmas"  ]).optional(),
  servings: z.string().optional(),
  difficulties: z.enum(["Easy", "Medium", "Hard"]).optional(),
  description: z.string().min(1, "Description is required.").max(65535).optional(),
  ingredients: z.string().min(1, "Ingredients are required.").max(65535).optional(),
  instructions: z.string().min(1, "Instructions are required.").max(65535).optional(),
  cookTime: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM.").optional(),
  prepTime: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM.").optional(),
  imageUrl: z.string().optional().nullable(),
  assignedToUserId: z.string().min(1,'AssignedToUserId is required').max(255).optional().nullable()
});