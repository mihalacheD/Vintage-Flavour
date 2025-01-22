import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const schema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export async function POST( request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if(!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { email : body.email }
  })
  if (user)
    return NextResponse.json({ error: "User already exist"}, { status: 400 })


  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    }
  })
  return NextResponse.json({ email: newUser.email})
}
