import { PrismaClient } from ".prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type IParams = {
    bookingId?: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const { bookingId } = params;
    if (!bookingId || typeof bookingId !== 'string') {
        throw new Error('Invalid bookingId')
    }

    const booking = await prisma.bookings.delete({
        where:{
            id: bookingId,
        }
    })

    return NextResponse.json(booking)
}