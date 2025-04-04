import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Update state
    navigate("/");
  };

  return (
    <div className="fixed z-50 top-0 right-0 w-full bg-black/30 backdrop-blur-lg shadow-lg px-5 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-white">Mockmate AI</div>

      {/* Buttons */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="h-12 w-12 cursor-pointer transition-all duration-200 active:scale-95"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <img className="h-full w-full" src={user?.avatar} alt="" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden transition-all duration-300">
              <ul className="py-2 text-sm">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${user.id}`);
                  }}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 sm:gap-8">
          <button
            className="text-white border border-white px-4 py-2 rounded-md transition duration-300 hover:bg-white hover:text-black hover:shadow-lg"
            onClick={() => {
              setAuth("login");
              navigate("/auth");
            }}
          >
            Login
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded-md transition duration-300 hover:bg-gray-500 hover:shadow-lg"
            onClick={() => {
              setAuth("signup");
              navigate("/auth");
            }}
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
