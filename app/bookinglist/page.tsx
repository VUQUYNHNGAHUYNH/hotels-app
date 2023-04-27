import getBookings from "../actions/getBookings";
import BookingList from "./BookingList";

type IParams = {
  propertiesId?: string;
};

const BookingListPage = async ({ params }: { params: IParams }) => {
  const bookings = await getBookings(params);
  return <BookingList bookings={bookings} />;
};

export default BookingListPage;
