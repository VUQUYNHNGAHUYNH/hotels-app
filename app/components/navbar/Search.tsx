"use client";

import { BiSearch } from "react-icons/bi";
import useCountries from "../hooks/useCountries";
import useSearchModal from "../hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const location = params?.get("location");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (location) {
      return getByValue(location as string)?.label;
    }
    return "Location";
  }, [location, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diffday = differenceInDays(end, start);

      if (diffday === 0) {
        diffday = 1;
      }

      return `${diffday} Days`;
    }
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full md:w-auto border rounded-full py-1 px-2 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-8 text-center">
          {locationLabel}
        </div>
        <div className="hidden sm:block text-sm  text-center font-semibold px-8 border-x">
          {durationLabel}
        </div>
        <div className="hidden sm:block text-sm text-center font-semibold px-8">
          {guestLabel}
        </div>
        <div className=" p-2 bg-yellow-600  rounded-full text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
