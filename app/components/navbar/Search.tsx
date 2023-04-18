"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="w-full md:w-auto border rounded-full py-1 px-2 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-8 text-center">Location</div>
        <div className="hidden sm:block text-sm  text-center font-semibold px-8 border-x">
          Date
        </div>
        <div className="hidden sm:block text-sm text-center font-semibold px-8">
          Guests
        </div>
        <div className=" p-2 bg-yellow-600  rounded-full text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
