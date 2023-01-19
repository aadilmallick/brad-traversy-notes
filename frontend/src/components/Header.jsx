import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTicketAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../utils/authService";
export const Header = () => {
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="p-4  bg-slate-700 text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/">Support Desk</Link>
        </div>
        <div className="flex space-x-4">
          {!user && (
            <Link to="/login" className="flex items-center space-x-1">
              <FaSignInAlt />
              <p>Login</p>
            </Link>
          )}
          {!user && (
            <Link to="/register" className="flex items-center space-x-1">
              <FaUser />
              <p>Register</p>
            </Link>
          )}
          {user && (
            <div
              className="flex items-center space-x-1 hover:text-lightgreen cursor-pointer"
              onClick={() => {
                authService.logout();
                dispatch(logout());
                navigate("/");
              }}
            >
              <FaSignOutAlt />
              <p>Logout</p>
            </div>
          )}
          {user && (
            <Link to="/new-ticket" className="flex items-center space-x-1">
              <FaTicketAlt />
              <p>New ticket</p>
            </Link>
          )}
          {user && (
            <Link to="/tickets" className="flex items-center space-x-1">
              <FaTicketAlt />
              <p>Tickets list</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
