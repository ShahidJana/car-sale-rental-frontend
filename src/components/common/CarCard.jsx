import React from "react";
import { FiStar, FiUsers, FiLayers } from "react-icons/fi";
import {
  GiCarDoor,
  GiGasPump,
  GiGearStick,
  GiSpeedometer,
} from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname === "/car-rent" ? "rental" : "sale";

  return (
    <div className="bg-white text-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full h-full flex flex-col">
      {/* Image Section */}
      <div className="h-48 relative overflow-hidden group">
        <img
          className="w-full h-full bg-gray-200 object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            car?.images?.length > 0
              ? `${car.images[0].url}`
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={`${car.make} ${car.model}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex items-center bg-yellow-100 px-3 py-1 rounded-full text-xs  text-yellow-700 shadow-md">
          {/* <FiStar className="text-yellow-400 mr-1" /> */}
          {car.condition || ""}
        </div>
        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-600 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ₹{car.price?.toLocaleString() || "N/A"}/-
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Title and Basic Info */}
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-gray-900 truncate">
            {car.make || "Make"} {car.model || "Model"}
          </h4>
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full ml-2">
            {car.year || "Year"}
          </span>
        </div>

      
        {/* Features Grid */}
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <GiGearStick className=" mr-2 flex-shrink-0 text-green-600" />
            <span>{car.transmission || "Automatic"}</span>
          </div>
          <div className="flex items-center">
            <GiGasPump className="text-green-600 mr-2 flex-shrink-0" />
            <span>{car.fuelType || "Petrol"}</span>
          </div>
          <div className="flex items-center">
            <FiLayers className="text-green-600 mr-2 flex-shrink-0" />
            <span>
              {car.mileage ? `${car.mileage.toLocaleString()} kmpl` : "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <GiSpeedometer className=" mr-2 flex-shrink-0 text-green-600" />
            <span>{car.engine ? `${car.engine} cc` : "N/A"}</span>
          </div>
          <div className="flex items-center">
            <FiUsers className="text-green-600 mr-2 flex-shrink-0" />
            <span>{car.seatingCapacity || "5"} seats</span>
          </div>
          <div className="flex items-center">
            <GiCarDoor className="text-green-600 mr-2 flex-shrink-0" />
            <span>{car.doors || "4"} doors</span>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2 border border-gray-300"
            style={{ backgroundColor: car.color?.toLowerCase() || "#000" }}
          />
          <span>{car.color || "Black"}</span>
        </div>

       
        {/* Status and Action Buttons */}
        <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-200">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              car.status === "available"
                ? "bg-green-100 text-green-800"
                : car.status === "sold"
                ? "bg-red-100 text-red-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {car.status === "available"
              ? "Available Now"
              : car.status === "sold"
              ? "Sold"
              : car.status || "Coming Soon"}
          </span>
          <button
            onClick={() => {
              navigate(
                type === "rental"
                  ? `/car-rent/${car._id}/detailed?type=${type}`
                  : `/car-sale/${car._id}/detailed?type=${type}`,
                {
                  state: { car },
                }
              );
            }}
            className="p-2 text-white bg-green-600 px-4 py-1 text-xs rounded-full font-medium hover:bg-green-700"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
