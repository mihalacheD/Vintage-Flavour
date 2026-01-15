import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RecipeSchema } from "@/utils/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    // Validare Zod
    const validation = RecipeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.flatten(), { status: 400 });
    }

    let imageUrl = body.imageUrl;

    // Logica de upload imagine (Base64 către Cloudinary)
    if (body.imageBase64 && body.imageBase64.startsWith("data:image")) {
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append("file", body.imageBase64);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (cloudinaryResponse.ok) {
        const data = await cloudinaryResponse.json();
        imageUrl = data.secure_url;
      }
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        id: randomUUID(),
        title: body.title,
        categories: body.categories,
        servings: body.servings,
        difficulties: body.difficulties,
        description: body.description,
        ingredients: body.ingredients,
        instructions: body.instructions,
        cookTime: body.cookTime,
        prepTime: body.prepTime,
        imageUrl: imageUrl,
        updatedAt: new Date(),
        assignedToUserId: session.user.id,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Recipe POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
