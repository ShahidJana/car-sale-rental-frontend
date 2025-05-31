import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);

  return (
    <div className="h-screen overflow-hidden font-urbanist">
      <div className="flex h-full relative bg-gray-50">
        {/* Hamburger Button (visible only below lg) */}
        <button
          className="fixed top-6 left-6 z-50 bg-green-600 text-white px-2 p-1 rounded-md shadow-md hover:bg-green-700 transition lg:hidden"
          onClick={() => setShowSidebar(!showSidebar)}
          aria-label="Toggle Sidebar"
        >
          &#9776;
        </button>

        {/* Overlay on small screens */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={handleCloseSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-8 font-semibold text-gray-700 z-40 transition-transform duration-300 ease-in-out transform
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:relative lg:block
          `}
        >
          <h2 className="text-3xl font-bold text-green-600 mb-8 ">
            Admin Panel <br />
          </h2>

          <nav className="flex flex-col gap-3">
            {[
              {
                to: "/admin-dashboard/",
                label: "Dashboard",
                bg: "bg-green-600",
                hover: "hover:bg-green-700",
              },
              {
                to: "/admin-dashboard/listed-cars",
                label: "Listed Cars",
                bg: "bg-yellow-500",
                hover: "hover:bg-yellow-600",
              },
              {
                to: "/admin-dashboard/sold-cars",
                label: "Sold Cars",
                bg: "bg-green-600",
                hover: "hover:bg-green-700",
              },
              {
                to: "/admin-dashboard/rented-cars",
                label: "Rented Cars",
                bg: "bg-yellow-500",
                hover: "hover:bg-yellow-600",
              },
              {
                to: "/admin-dashboard/active-users",
                label: "Active Users",
                bg: "bg-green-600",
                hover: "hover:bg-green-700",
              },
            ].map(({ to, label, bg, hover }) => (
              <Link
                key={to}
                to={to}
                onClick={handleCloseSidebar}
                className={`block rounded-md px-4 py-2 text-white font-medium transition ${bg} ${hover}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto p-2 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
