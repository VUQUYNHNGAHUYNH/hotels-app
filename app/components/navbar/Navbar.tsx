"use client";

import Image from "next/image";
import Container from "../Container";
import Categories from "./Categories";
import Menu from "./Menu";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="fixed w-full z-10 shadow-sm bg-white">
      <Container>
        <div className="flex items-center justify-between gap-3 md:gap-0 py-4 border-b-2">
          {/* logo */}
          <Image
            src="/img/logo.svg"
            width={80}
            height={80}
            alt="logo"
            className="cursor-pointer"
          />
          {/* search */}
          <Search />
          {/* menu */}
          <Menu />
        </div>
        {/* categories */}
        <Categories />
      </Container>
    </div>
  );
};

export default Navbar;
