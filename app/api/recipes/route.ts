import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { RecipeSchema } from '../../validationSchema';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOption';

export async function POST(request: NextRequest) {

const session = await getServerSession(authOptions)
if(!session)
  return NextResponse.json({}, { status: 401 })

  const body = await request.json();

  // Validarea input-ului folosind Zod
  const validation = RecipeSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Inițializare URL imagine
  let imageUrl = body.imageUrl; // Dacă imaginea este deja un URL valid
  if (body.imageBase64) {
    try {
      // Verificare dacă imageBase64 este valid
      if (!isValidBase64(body.imageBase64)) {
        return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
      }

      // Trimite imaginea la Cloudinary folosind un endpoint intern
      const cloudinaryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: body.imageBase64 }),
      });

      if (!cloudinaryResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const cloudinaryData = await cloudinaryResponse.json();
      imageUrl = cloudinaryData.url; // Actualizăm URL-ul imaginii
    } catch (error) {
      const errorMessage = (error as Error).message;
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  // Crearea unei noi rețete în baza de date
  const newRecipe = await prisma.recipe.create({
    data: {
      title: body.title,
      categories: body.categories,
      servings: body.servings,
      difficulties: body.difficulties,
      description: body.description,
      ingredients: body.ingredients,
      instructions: body.instructions,
      cookTime: body.cookTime,
      prepTime: body.prepTime,
      imageUrl: imageUrl, // URL-ul imaginii
    },
  });

  // Returnează rețeta creată
  return NextResponse.json(newRecipe, { status: 201 });
}

// Funcție pentru a verifica validitatea unui base64
function isValidBase64(base64String: string) {
  const regex = /^data:image\/[a-zA-Z]+;base64,/;
  return regex.test(base64String);
}
