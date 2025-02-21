import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import {
  createCustomerSchema,
  deleteManyCustomersSchema,
  updateCustomerSchema,
} from "@/features/customers/schema/schema";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/nextAuthOptions";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const bodyRequest = await req.json();
    const data = createCustomerSchema.parse(bodyRequest);
    const customer = await prisma.customer.create({
      data: { ...data, birthDate: data.birthDate.toString() },
    });
    return NextResponse.json({ message: customer }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bodyRequest = await req.json();
    const { id, ...rest } = updateCustomerSchema.parse(bodyRequest);
    const customer = await prisma.customer.update({
      where: { id },
      data: { ...rest, birthDate: rest.birthDate.toString() },
    });
    return NextResponse.json({ message: customer }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bodyRequest = await req.json();
    const data = deleteManyCustomersSchema.parse(bodyRequest);
    const customer = await prisma.customer.deleteMany({
      where: { id: { in: data.ids } },
    });
    return NextResponse.json({ message: customer }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json({ message: customers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
