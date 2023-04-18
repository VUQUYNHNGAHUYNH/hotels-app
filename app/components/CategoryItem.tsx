"use client";

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";

type CategoryItemProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();

  // params = {category: "beach"}  -> object
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // Define an empty object to store the current query parameters
    let currentQuery = {};
    // If the params variable exists, parse it into an object and store it in currentQuery
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    // Create a new object called updatedQuery by spreading currentQuery and adding a new category key-value pair
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    // Check if the category filter is already selected, and remove it from the new query if it is
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // Use qs.stringifyUrl() to convert the updated query object into a URL string
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Use the router.push() function to navigate to a new URL with the updated query parameters
    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3  transition cursor-pointer hover:border-b-gray-800 
     ${selected ? "bg-yellow-500 text-white" : "bg-transparent text-gray-600"} 
      `}
    >
      <Icon size={28} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryItem;
