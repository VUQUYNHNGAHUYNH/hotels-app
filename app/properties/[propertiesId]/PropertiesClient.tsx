"use client";

import Container from "@/app/components/Container";
import { BsFillHouseDoorFill, BsPeopleFill } from "react-icons/bs";
import { Bookings } from "@prisma/client";
import Image from "next/image";
import { SafeProperty } from "@/app/types";

type PropertiesClientProps = {
  bookings?: Bookings[];
  properties: SafeProperty;
};

const PropertiesClient: React.FC<PropertiesClientProps> = ({ properties }) => {
  console.log(properties);
  return (
    <Container>
      <div className="pt-32 mx-auto">
        <div className="font-semibold text-xl lg:text-2xl">
          Hotel on {properties.location}
        </div>
        <div className="font-medium text-gray-500">
          The property is close to the {properties.category}
        </div>
        <div className="flex items-center gap-4 text-gray-600 mt-4">
          <div className="flex justify-center gap-2">
            <BsPeopleFill size={22} />
            {properties.guestCount} guests
          </div>
          <div className="flex justify-center gap-2">
            <BsFillHouseDoorFill size={22} /> {properties.roomCount} rooms
          </div>
        </div>
        <Image
          src={properties.imageSrc}
          alt="img"
          className="rounded-xl mx-auto mt-8"
          width={600}
          height={200}
        />
      </div>
    </Container>
  );
};

export default PropertiesClient;
