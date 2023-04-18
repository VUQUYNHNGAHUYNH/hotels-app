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
      className={`relative disabled:opacity-70 rounded-lg hover:opacity-80 transition w-full
       ${outline ? "bg-white border-black text-black" : "bg-yellow-600 text-white"}`}
    >
      {label}
    </button>
  );
};

export default Button;
