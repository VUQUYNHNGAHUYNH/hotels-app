"use client";

type MenuItemProps = {
  onClick: () => void;
  label: string;
};
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-yellow-600 hover:text-white font-semibold "
    >
      {label}
    </div>
  );
};

export default MenuItem;
