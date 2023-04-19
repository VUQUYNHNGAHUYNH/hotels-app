import { PrismaClient } from ".prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {  category, imageSrc,roomCount,guestCount,location,price} = body

    const property = await prisma.properties.create({
      data: {
        category,
        imageSrc,
        roomCount,
        guestCount,
        location: location.label,
        price: parseInt(price, 10),
      },
    });


    return NextResponse.json(property)
}