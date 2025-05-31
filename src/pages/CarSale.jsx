// import React, { useEffect, useState } from "react";
// import Navbar from "../components/layout/Navbar";

// function CarSale() {
//   const [data, setData] = useState([]);

//   const FetchApi = async () => {
//     try {
//       const response = await fetch(
//         "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const result = await response.json();
//       setData(result.results.reverse() || []); // Ensure correct data extraction
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     FetchApi();
//   }, []);

//   console.log("Fetched Data is:", data);

//   return (
//     <div>
//       <Navbar/>
//       <div className="p-6">
//         <h1 className="text-3xl font-bold text-center mb-6">Sale Vehicle Data</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//           {data.map((item, index) => (
//             <div key={index} className="bg-white shadow-lg rounded-lg p-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {item.model || "Unknown Model"}
//               </h2>
//               <p className="text-gray-600">
//                 <strong>Brand:</strong> {item.make || "N/A"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Year:</strong> {item.year || "N/A"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Vclass:</strong> {item.vclass || "N/A"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Fuel Type:</strong> {item.fueltype || "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CarSale;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import CarCard from "../carManagement/CarCard";
import LoadingSpinner from "../carManagement/LoadingSpinner";
import SearchBar from "../carManagement/SearchBar";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/cars");
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Car Sale
        </h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No cars found
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm
              ? "Try a different search term"
              : "Get started by adding a new car"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CarList;
