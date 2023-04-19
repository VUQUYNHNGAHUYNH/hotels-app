"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type ButtonProps = {
  propertiesId: string;
};
const HeartButton: React.FC<ButtonProps> = ({ propertiesId }) => {
  const favorited = true;
  const toggledFavorite = () => {};

  return (
    <div
      onClick={toggledFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={30}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={30}
        className={favorited ? "fill-rose-500" : "fill-gray-400"}
      />
    </div>
  );
};

export default HeartButton;
