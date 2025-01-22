import { patchRecipeSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOption';


export async function PATCH( request: NextRequest,
                           { params }: { params: Promise<{ id: string }> }){

   const session = await getServerSession(authOptions)
   if(!session)
   return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    const validation = patchRecipeSchema.safeParse(body)

    if(!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400} )


    const id = (await params).id
    const recipe = await prisma.recipe.findUnique({
      where: { id: id}
    })


    if (body.assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: body.assignedToUserId },
      })
      if (!user)
        return NextResponse.json(
          { error: "Invalid user." },
          { status: 400 }
        );
    }

    if(!recipe)
      return NextResponse.json({ error: "Invalid recipe"}, { status: 404 })

    const updatedRecipe = await prisma.recipe.update({
      where: { id : recipe.id},
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
        imageUrl: body.imageUrl, // URL-ul imaginii
        assignedToUserId : body.assignedToUserId
      }
    })
    return NextResponse.json(updatedRecipe)
}



export async function DELETE( request: NextRequest,
                            { params }: { params: Promise<{ id: string }> }
){

  const session = await getServerSession(authOptions)
  if(!session)
  return NextResponse.json({}, { status: 401 })

  const id = (await params).id
  const recipe = await prisma.recipe.findUnique({
    where: { id: id}
  })

  if(!recipe)
    return NextResponse.json({ error: "Invalid recipe"}, { status: 404 })

  await prisma.recipe.delete({
    where: { id: id}
  })

  return NextResponse.json({})
}