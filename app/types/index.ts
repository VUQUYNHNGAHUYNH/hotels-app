import { Bookings, Properties } from "@prisma/client";

export type SafeProperty = Omit<Properties, "createAt" > & {createAt: string}

export type SafeBooking = Omit<Bookings,  "createAt" | "startDate" | "endDate"| "properties"> & {
    createAt: string;
    startDate: string;
    endDate: string;
    properties: SafeProperty;
}