import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const subscriberSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validăm datele
    const validation = subscriberSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // 2. Verificăm dacă există deja email-ul
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You are already subscribed!" },
        { status: 400 }
      );
    }

    // 3. Salvăm în baza de date
    const newSubscriber = await prisma.newsletterSubscriber.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json(newSubscriber, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
