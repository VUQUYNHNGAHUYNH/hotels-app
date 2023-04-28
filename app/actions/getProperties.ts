import { PrismaClient } from ".prisma/client";


const prisma = new PrismaClient();

export type IParams = {
    guestCount?: number;
    roomCount?: number;
    startDate?: string;
    endDate?: string;
    location?: string;
    category?: string;
}

export default async function getProperties(params?: IParams) {
 try {
    const { guestCount, roomCount, startDate, endDate, location, category } = params ?? {};

    let query:any = {}

    if ( category){
        query.category = category
    }

    if (location){
        query.location = location
    }

    if (roomCount) {
        query.roomCount = {
          gte: +roomCount
        }
      }
  
      if (guestCount) {
        query.guestCount = {
          gte: +guestCount
        }
      }  

      if (startDate && endDate) {
        query.NOT = {
          bookings: {
            some: {
              OR: [
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate }
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate }
                }
              ]
            }
          }
        }
      }

    const properties = await prisma.properties.findMany({
        where: query,
        orderBy:{ createAt: 'desc'}
    });

    const safeProperties = properties.map((property) => ({
        ...property,
        createAt: property.createAt.toISOString(),
 }))

    return safeProperties
 } catch (error:any) {
    throw new Error(error)
 }
}