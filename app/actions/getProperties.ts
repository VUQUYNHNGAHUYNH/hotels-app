import { PrismaClient } from ".prisma/client";


const prisma = new PrismaClient();

export default async function getProperties() {
 try {
    const properties = await prisma.properties.findMany({
orderBy:{ createAt: 'desc'}
    });
    return properties
 } catch (error:any) {
    throw new Error(error)
 }
}