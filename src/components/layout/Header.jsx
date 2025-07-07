import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "/src/assets/JanaDrive.png";
import { FaSignOutAlt, FaDesktop } from "react-icons/fa";

const API_URL = "http://localhost:8080/api";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginUser, setLogInUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef();

  const handleLogOut = () => {
    localStorage.clear();
    setIsUserMenuOpen(false);

    setTimeout(() => {
      navigate("/home");
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUsername = localStorage.getItem("loggedInUser");
      if (!loggedInUsername) return;

      try {
        const { data: users } = await axios.get(
          `${API_URL}/user_auth/getAllUsers`
        );
        const currentUser = users.find(
          (user) => user.name === loggedInUsername
        );

        if (!currentUser) return;

        setLogInUser(currentUser.name);
        setUserRole(currentUser.role === "admin" ? "admin" : "user");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white text-gray-900 px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-lg font-normal text-black">
            <img src={img} alt="Logo" className="w-14 h-14" />
            <span className="ml-2 font-semibold">JANADRIVE</span>
          </div>

          <nav className="hidden lg:flex space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium"
                  : "text-black hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/car-sale"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium"
                  : "text-black hover:underline"
              }
            >
              Buy a Car
            </NavLink>
            <NavLink
              to="/car-rent"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium"
                  : "text-black hover:underline"
              }
            >
              Rent a Car
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium"
                  : "text-black hover:underline"
              }
            >
              About us
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium"
                  : "text-black hover:underline"
              }
            >
              Contact us
            </NavLink>
          </nav>

          <div className="hidden lg:flex space-x-4 items-center">
            {/* Always visible */}
            <Link to={`/sell-a-car`}>
              <button className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md font-semibold text-base">
                Post Car Ads
              </button>
            </Link>

            {/* Show only if user is NOT logged in */}
            {!loginUser && (
              <Link to="/login">
                <button className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md font-semibold text-base">
                  Login
                </button>
              </Link>
            )}

            {/* Show user menu if user is logged in */}
            {loginUser && (
              <div className="relative" ref={menuRef}>
                <button
                  title={loginUser}
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="bg-gray-300 hover:bg-green-600 hover:text-white text-black px-2 py-2 rounded-full w-9 h-9 flex items-center justify-center font-semibold uppercase"
                >
                  {loginUser?.[0]?.toUpperCase()}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 p-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-600 hover:rounded-md hover:text-white"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FaDesktop />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-red-600 hover:rounded-md hover:text-white"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "🗙" : "≡"}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-3 flex flex-col items-start">
            <Link
              to="/home"
              className="w-full hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/car-sale"
              className="w-full hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Buy a Car
            </Link>
            <Link
              to="/car-rent"
              className="w-full hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rent a Car
            </Link>
            <Link
              to="/about-us"
              className="w-full hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              to="/contact-us"
              className="w-full hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </Link>

            <Link to={`/sell-a-car`} className="w-full">
              <button
                className="bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded-md font-semibold w-32 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Post Car Ads
              </button>
            </Link>
            {userRole === "admin" && (
              <Link to="/admin-dashboard" className="w-full">
                <button
                  className="bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded-md font-semibold w-32 text-sm flex items-center justify-center gap-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaDesktop />
                  Dashboard
                </button>
              </Link>
            )}

            {loginUser && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogOut();
                }}
                className="bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded-md font-semibold w-32 text-sm flex items-center justify-center gap-1"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      <div className="h-20 lg:h-20"></div>
    </>
  );
}
