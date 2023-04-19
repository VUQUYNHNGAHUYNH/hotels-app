"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

type EmptyState = {
  title?: string;
  showReset?: boolean;
};

const EmptyState: React.FC<EmptyState> = ({
  title = "No exact matches",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center">
      <div className="text-xl font-semibold">{title}</div>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
