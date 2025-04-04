import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-lg">
      <div className="bg-gray-900 w-full p-4 rounded-2xl shadow-xl text-white">
        {/* Dashboard Title */}
        <h2 className="text-center text-xl font-semibold">
          Dashboard: {user?.username || "Guest"}
        </h2>

        {/* User Profile */}
        <div className="flex flex-col items-center mt-5 bg-gray-800 p-5 rounded-lg shadow-md">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h1 className="mt-3 text-lg font-bold capitalize">
            {user?.username || "Guest"}
          </h1>
          <p className="text-gray-400 text-sm">{user?.email || "No email available"}</p>

          <button
            className="mt-3 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all duration-200"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
