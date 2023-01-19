import React from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  return <div>useAuth</div>;
};
