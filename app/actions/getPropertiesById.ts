import { PrismaClient } from "@prisma/client";

type IParams  = {
    propertiesId?: string;
}
const prisma = new PrismaClient();

export default async function getPropertiesById(params: IParams) {
try {
    const { propertiesId } = params;
    const property = await prisma.properties.findUnique({
        where: {id: propertiesId},
    })

    if (!property) {
        return null;
    }
    return {...property, createAt: property.createAt.toString()}
} catch (error:any) {
    throw new Error(error)
}
}
