"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import usePropertiesModal from "../hooks/usePropertiesModal";

const Menu = () => {
  const propertiesModal = usePropertiesModal();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((value) => !value), []);
  return (
    <div className="relative">
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div className="text-sm hover:bg-yellow-600 hover:text-white font-semibold py-3 px-4 rounded-full transition cursor-pointer border border-gray-300">
          My reservations
        </div>
        <div
          onClick={() => propertiesModal.onOpen()}
          className="text-sm hover:bg-yellow-600 hover:text-white font-semibold py-3 px-4 rounded-full transition cursor-pointer border border-gray-300"
        >
          Add properties
        </div>
        <div className="text-sm hover:bg-yellow-600 hover:text-white font-semibold py-3 px-4 rounded-full transition cursor-pointer border border-gray-300">
          My favorites
        </div>
      </div>
      <div
        onClick={toggleOpen}
        className="lg:hidden block p-3 border rounded-full hover:shadow-lg transition cursor-pointer"
      >
        <AiOutlineMenu size={20} />
      </div>
      {isOpen && (
        <div className="absolute flex flex-col lg:hidden top-16 right-4 w-[250px] text-base rounded-xl bg-yellow-50 overflow-hidden cursor-pointer">
          <MenuItem onClick={() => {}} label="My reservations list" />
          <MenuItem onClick={() => {}} label="My properties list" />
          <MenuItem
            onClick={() => propertiesModal.onOpen()}
            label="Add my properties"
          />
          <MenuItem onClick={() => {}} label="Add my reservations " />
          <MenuItem onClick={() => {}} label="My favorites" />
        </div>
      )}
    </div>
  );
};

export default Menu;
