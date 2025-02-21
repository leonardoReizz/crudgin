import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  email: z.string().email().max(255),
  fullName: z.string().max(100),
  password: z.string().min(8).max(32),
});

export async function POST(req: NextRequest) {
  try {
    const bodyRequest = await req.json();
    const data = schema.parse(bodyRequest);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Este email ja existe" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { email: data.email, hashedPassword, fullName: data.fullName },
    });

    return NextResponse.json(
      { message: "User created", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
