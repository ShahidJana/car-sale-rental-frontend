import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCar, FaMoneyCheck, FaKey, FaUserCheck, FaRegComment, FaComments	 } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../../utils";

const API_URL = `http://localhost:8080/api`;

const DashboardCard = ({ title, value, bgColor, to, Icon }) => (
  <Link to={to} className="w-full">
    <div className="aspect-auto">
      <div
        className={`w-11/12 h-3/4 p-6 md:p-8 rounded-2xl shadow-lg text-white ${bgColor} hover:scale-105 transform transition-all duration-300 flex flex-col justify-between`}
      >
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          <p className="text-3xl md:text-4xl font-extrabold mt-2">{value}</p>
        </div>
        <Icon
          className="text-5xl md:text-6xl opacity-60 self-end"
          aria-label={title}
        />
      </div>
    </div>
  </Link>
);

export const Dashboard = () => {
  const [listedCars, setListedCars] = useState([]);
  const [soldCars, setSoldCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [reviewRating,setReviewRating] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [listed, sold, rented, users,reviews] = await Promise.all([
          axios.get(`${API_URL}/cars/`),
          axios.get(`${API_URL}/sales/`),
          axios.get(`${API_URL}/rentals/`),
          axios.get(`${API_URL}/user_auth/getAllUsers`),
          axios.get(`${API_URL}/reviewratings/`),
          
        ]);

        setListedCars(listed.data || []);
        setSoldCars(sold.data.sales || []);
        setRentedCars(rented.data || []);
        setActiveUsers(users.data || []);
        setReviewRating(reviews.data.reviews || [])
      } catch (error) {
        handleError("Failed to fetch dashboard data", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const adminName = localStorage.getItem("loggedInUser");

  const stats = useMemo(
    () => [
      {
        title: "Listed Cars",
        value: listedCars.length,
        bgColor: "bg-blue-500",
        to: "/admin-dashboard/listed-cars",
        Icon: FaCar,
      },
      {
        title: "Sold Cars",
        value: soldCars.length,
        bgColor: "bg-green-500",
        to: "/admin-dashboard/sold-cars",
        Icon: FaMoneyCheck,
      },
      {
        title: "Rented Cars",
        value: rentedCars.length,
        bgColor: "bg-yellow-500",
        to: "/admin-dashboard/rented-cars",
        Icon: FaKey,
      },
      {
        title: "Active Users",
        value: activeUsers.length ,
        bgColor: "bg-purple-500",
        to: "/admin-dashboard/active-users",
        Icon: FaUserCheck,
      },
      {
        title: "Reviews",
        value: reviewRating.length ,
        bgColor: "bg-gray-400",
        to: "/admin-dashboard/reviews",
        Icon: FaComments,
      },
    ],
    [listedCars, soldCars, rentedCars, activeUsers]
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mt-2 mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">
          {  adminName || "Dashboard"}
          </h1>
          <p className="text-gray-600">Welcome to the Admin Dashboard!</p>
        </div>
      </div>

      {loading ? (
        <p className="text-lg text-gray-500">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <DashboardCard key={index} {...stat} />
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};
