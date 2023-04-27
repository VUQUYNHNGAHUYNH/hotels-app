"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import CalendarInput from "../input/CalendarInput";

type BookingProps = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (range: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
};
const Bookings: React.FC<BookingProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl">$ {price}</div>
        <div className="text-gray-500">per night</div>
      </div>
      <hr />
      <CalendarInput
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Book Now" onClick={onSubmit} />
      </div>
      <div className="flex items-center justify-between font-bold text-lg p-4 ">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default Bookings;
