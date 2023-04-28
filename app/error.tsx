"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

type ErrorStateProps = {
  error: Error;
};

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  });
  return <EmptyState title="Something went wrong" />;
};

export default ErrorState;
