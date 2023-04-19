"use client";

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
  outline?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative text-lg p-1 disabled:opacity-70 rounded-lg hover:opacity-80 transition w-full
       ${
         outline
           ? "bg-white  border-yellow-600 border-2 text-yellow-600"
           : "bg-yellow-600 text-white border-yellow-600 border-2 "
       }`}
    >
      {label}
    </button>
  );
};

export default Button;
