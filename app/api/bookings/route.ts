import { PrismaClient } from ".prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();

    const { propertiesId, startDate, endDate, totalPrice } = body;
    
    if (!propertiesId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error()
    }

    const booking = await prisma.properties.update({
        where:{
            id: propertiesId
        },
        data:{
            bookings:{
                create:{
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(booking)
}