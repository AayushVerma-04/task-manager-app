import React from "react";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/UseAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const onLogout = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-700">Welcome, {user.email}</span>
        <button
          onClick={onLogout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
    </nav>
  );
};

export default Navbar;
