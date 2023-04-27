import { PrismaClient } from ".prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type IParams = {
    propertyId: string;
}

export async function DELETE(req: Request, {params}: { params: IParams}) {
    const { propertyId } = params;

    if (!propertyId || typeof propertyId !== 'string') {
        throw new Error('Invalid propertyId');
    }

    const property = await prisma.properties.delete({
        where: {
            id: propertyId
        }
    })

    return NextResponse.json(property);
}