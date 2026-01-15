import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { patchRecipeSchema } from "@/utils/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return NextResponse.json({ error: "Recipe not found" }, { status: 404 });


  if (recipe.assignedToUserId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden: You are not the owner" }, { status: 403 });
  }

  const body = await request.json();
  const validation = patchRecipeSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });


  const updatedRecipe = await prisma.recipe.update({
    where: { id },
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
      imageUrl: body.imageUrl,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedRecipe);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { id } });

  if (!recipe)
    return NextResponse.json({ error: "Invalid recipe" }, { status: 404 });

  if (recipe.assignedToUserId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.recipe.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted successfully" });
}
