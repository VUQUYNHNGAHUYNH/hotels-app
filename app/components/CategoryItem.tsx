import { IconType } from "react-icons";

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
  return (
    <div
      onClick={() => {}}
      className={`flex flex-col items-center justify-center gap-2 p-3  transition cursor-pointer 
     ${selected ? "bg-yellow-500 text-white" : "bg-transparent text-gray-600"} 
      `}
    >
      <Icon size={28} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryItem;
