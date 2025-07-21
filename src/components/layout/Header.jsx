import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "/src/assets/JanaDrive.png";
import { FaBars, FaTimes, FaSignOutAlt, FaDesktop } from "react-icons/fa";

const API_URL = "http://localhost:8080/api";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogOut = () => {
    localStorage.clear();
    setIsUserMenuOpen(false);
    navigate("/home");
    window.location.reload();
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

        setLoginUser(currentUser.name);
        setUserRole(currentUser.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { to: "/home", label: "Home" },
    { to: "/car-sale", label: "Buy a Car" },
    { to: "/car-rent", label: "Rent a Car" },
    { to: "/about-us", label: "About us" },
    { to: "/contact-us", label: "Contact us" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-sm text-gray-900 px-4 sm:px-6 py-3 sm:py-4 font-urbanist shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center text-lg font-normal text-black">
            <NavLink to="/home">
              <img src={img} alt="Logo" className="w-12 h-12 sm:w-14 sm:h-14" />
            </NavLink>
            <span className="ml-2 font-semibold text-base sm:text-lg">
              JANADRIVE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6 text-sm lg:text-base">
            {menuItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-medium"
                    : "text-black hover:underline"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex space-x-3 items-center">
            <Link to="/sell-a-car">
              <button className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md font-semibold text-sm lg:text-base">
                Post Car Ads
              </button>
            </Link>

            {!loginUser ? (
              <Link to="/login">
                <button className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md font-semibold text-sm lg:text-base">
                  Login
                </button>
              </Link>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="bg-gray-300 hover:bg-green-600 hover:text-white text-black px-2 py-2 rounded-full w-9 h-9 flex items-center justify-center font-semibold uppercase"
                  title={loginUser}
                >
                  {loginUser[0].toUpperCase()}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 p-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white hover:rounded-md"
                      >
                        <FaDesktop /> Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white hover:rounded-md"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-2xl ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-start px-4 mt-3 space-y-3 ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          {menuItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full hover:text-green-600 ${
                  isActive ? "text-green-600 font-medium" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <Link to="/sell-a-car" className="w-full">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded-md font-semibold w-32 text-sm"
            >
              Post Car Ads
            </button>
          </Link>

          {userRole === "admin" && (
            <Link to="/admin-dashboard" className="w-full">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-green-600 text-white hover:bg-green-700 px-2 py-1 rounded-md font-semibold w-32 text-sm flex items-center justify-center gap-1"
              >
                <FaDesktop /> Dashboard
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
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </header>

      {/* Header Offset Spacer */}
      <div className="h-20 lg:h-20"></div>
    </>
  );
}
