"use client";

import Container from "../components/Container";
import { SafeBooking } from "../types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Card from "../components/Card";

type BookingListProps = {
  bookings: SafeBooking[];
};

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/bookings/${id}`)
        .then(() => {
          toast.success("Booking deleted successfully");
          router.refresh();
        })
        .catch(() => {
          toast.error("Error deleting booking");
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <div className="mt-32  p-2 lg:p-6">
        <h1 className="text-xl xl:text-2xl text-center font-bold text-yellow-600">
          Bookings List
        </h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              data={booking.properties}
              bookings={booking}
              actionId={booking.id}
              onAction={onCancel}
              disabled={deleteId === booking.id}
              actionLabel="Cancel"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BookingList;
