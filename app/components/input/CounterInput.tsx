"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

const CounterInput: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium"> {title}</div>
        <div className="font-light text-gray-700">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={onReduce}
          className="w-6 h-6 rounded-full border-gray-600 border-[1px] flex items-center justify-center text-gray-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-lg text-gray-700">{value}</div>
        <div
          onClick={onAdd}
          className="w-6 h-6 rounded-full border-gray-600 border-[1px] flex items-center justify-center text-gray-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default CounterInput;
