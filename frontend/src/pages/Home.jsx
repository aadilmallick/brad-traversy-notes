import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

export const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      Home
      {user && <p>Hello, {user.name}</p>}
    </div>
  );
};
