"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Button from "./Button";
import { SafeBooking, SafeProperty } from "../types";

type CardProps = {
  data: SafeProperty;
  bookings?: SafeBooking;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};
const Card: React.FC<CardProps> = ({
  data,
  bookings,
  onAction,
  disabled,
  actionLabel,
  actionId,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (bookings) {
      return bookings.totalPrice;
    }
    return data.price;
  }, [bookings, data.price]);

  const bookingDate = useMemo(() => {
    if (!bookings) return null;

    const start = new Date(bookings.startDate);
    const end = new Date(bookings.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [bookings]);

  return (
    <div
      onClick={() => router.push(`/properties/${data.id}`)}
      className="col-span-1 cursor-pointer group pt-8 md:pt-4"
    >
      <div className="flex flex-col w-full">
        <div className="w-full aspect-square relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="Listings"
            className="object-cover h-full w-full transtion hover:opacity-80"
          />
        </div>
        <div className="text-lg font-semibold">{data.location}</div>
        <div className="text-gray-600 text-sm">
          {bookingDate || data.category}
        </div>
        <div className="font-semibold text-lg py-2">${price}</div>
        {!bookings && <div className="font-light text-gray-600">/night</div>}

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
