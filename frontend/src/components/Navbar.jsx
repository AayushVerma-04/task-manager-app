import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();

  if(!user){
    return null;
  }

  const location = useLocation();
  const isDashboard = location.pathname === '/user'

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Welcome,
          <button
            onClick={() => navigate("/user")}
            className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            {user.username}
          </button>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isDashboard &&
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" 
        onClick={()=>navigate('/tasks')}>
          HOME
        </button>}
        <button
          onClick={logout}
          className="px-4 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
