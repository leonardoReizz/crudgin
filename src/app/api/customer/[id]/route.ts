import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/nextAuthOptions";

const prisma = new PrismaClient();

interface Params {
  id: string;
}

const schema = z.object({
  id: z.string().max(32),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = schema.parse(params);
    const customer = await prisma.customer.findFirst({ where: { id } });
    if (!customer)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: customer }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
