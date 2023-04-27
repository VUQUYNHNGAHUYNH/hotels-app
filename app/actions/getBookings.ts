import { PrismaClient } from ".prisma/client";

type IParams = {
    propertiesId?: string;
}
const prisma = new PrismaClient();

export default async function getBookings( params: IParams) {
    try {
        const { propertiesId } = params;
const query: any = {}

if (propertiesId) {
    query.propertiesId = propertiesId
}
const bookings = await prisma.bookings.findMany({
    where: query,
    include: {
        properties: true
    },
    orderBy: {
        createAt: 'desc'
    }
})
const safeBooking = bookings.map((booking) => ({
    ...booking,
    createAt: booking.createAt.toISOString(),
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    properties:{
        ...booking.properties,
        createAt: booking.properties.createAt.toISOString(),
    }
}))

return safeBooking
    } catch (error:any) {
        throw new Error(error)
    }
}