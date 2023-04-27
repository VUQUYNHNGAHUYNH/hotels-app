"use client";

import Container from "@/app/components/Container";
import { BsFillHouseDoorFill, BsPeopleFill } from "react-icons/bs";
import Image from "next/image";
import { SafeBooking, SafeProperty } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import BookingList from "@/app/components/bookings/Bookings";
import { Range } from "react-date-range";

type PropertiesClientProps = {
  bookings?: SafeBooking[];
  properties: SafeProperty;
};

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  properties,
  bookings = [],
}) => {
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    bookings.forEach((booking: any) => {
      const range = eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [bookings]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(properties.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateBooking = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/bookings", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        propertiesId: properties.id,
      })
      .then(() => {
        toast.success("Booking created successfully!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, properties.id, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && properties.price) {
        setTotalPrice(dayCount * properties.price);
      } else {
        setTotalPrice(properties.price);
      }
    }
  }, [dateRange, properties.price]);

  return (
    <Container>
      <div className="pt-32 mx-auto">
        {/* header */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="font-semibold text-xl lg:text-2xl">
            Hotel on {properties.location}
          </div>
          <div className="font-medium text-gray-500 md:text-lg">
            The property is close to the {properties.category}
          </div>
          <div className="flex items-center gap-4 font-semibold text-gray-500 mt-4">
            <div className="flex justify-center gap-2">
              <BsPeopleFill size={22} />
              {properties.guestCount} guests
            </div>
            <div className="flex justify-center gap-2">
              <BsFillHouseDoorFill size={22} /> {properties.roomCount} rooms
            </div>
          </div>
        </div>

        {/* image and booking */}
        <div className="flex flex-col-reverse md:flex-row md:gap-8">
          <div className="md:w-1/2">
            <Image
              src={properties.imageSrc}
              alt="img"
              className="rounded-xl mx-auto mt-8"
              width={600}
              height={200}
            />
          </div>

          <div className="md:w-1/2">
            <BookingList
              price={properties.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateBooking}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PropertiesClient;
