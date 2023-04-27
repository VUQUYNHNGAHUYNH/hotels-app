"use client";

import { SafeProperty } from "../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Card from "../components/Card";

type PropertiesListProps = {
  properties: SafeProperty[];
};

const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => {
  const router = useRouter();
  const [propertyId, setPropertyId] = useState("");

  const onDelte = async (id: string) => {
    setPropertyId(id);

    axios
      .delete(`/api/properties/${id}`)
      .then(() => {
        toast.success("Property deleted successfully!");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setPropertyId("");
      });
  };
  return (
    <div className="mt-32 p-2 lg:p-6">
      <h1 className="text-xl xl:text-2xl text-center font-bold text-yellow-600">
        Properties List
      </h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((property) => (
          <Card
            key={property.id}
            data={property}
            actionId={property.id}
            onAction={onDelte}
            disabled={propertyId === property.id}
            actionLabel="Delete"
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;
