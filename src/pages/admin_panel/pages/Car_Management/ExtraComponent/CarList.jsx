import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import CarCard from "./CarCard";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import { handleError } from "../../../../utils";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars");
      setCars(response.data);
      setLoading(false);
    } catch (err) {
      handleError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
    } catch (err) {
      handleError(err.message)
    }
  };
  const filteredCars = cars.filter(
    (car) =>
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.condition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-800 font-urbanist">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="flex flex-col sm:flex-row-1 gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <h1 className="text-3xl font-bold text-gray-900">Car Inventory</h1>
          <h2 className=" font-semibold">
            Total Cars:{" "}
            {cars.length === 0 ||
            cars.length == undefined ||
            cars.length == null
              ? `0`
              : cars.length}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Link
            to="new"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            <FiPlus className="mr-2" />
            Add Car
          </Link>
        </div>
      </div>

      {/* Cards */}
      {filteredCars.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
          {/* <svg
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
          </svg> */}
          <HiOutlineEmojiSad
            size={24}
            className="mx-auto h-12 w-12 text-gray-400"
          />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            No cars found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try searching with a different name or model."
              : "You can start by adding a new car to the inventory."}
          </p>
          <div className="mt-6">
            <Link
              to="new"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-green-600 text-white hover:bg-yellow-400 transition"
            >
              <FiPlus className="mr-2" />
              Add New Car
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FiPlus } from 'react-icons/fi';
// import CarCard from './CarCard';
// import LoadingSpinner from './LoadingSpinner';
// import SearchBar from './SearchBar';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/cars');
//         setCars(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/cars/${id}`);
//       setCars(cars.filter(car => car._id !== id));
//     } catch (err) {
//       console.error('Error deleting car:', err);
//     }
//   };

//   const filteredCars = cars.filter(car =>
//     car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     car.model?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Car Inventory</h1>
//         <div className="flex space-x-4 w-full md:w-auto">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <Link
//             to="new"
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <FiPlus className="mr-2" />
//             Add Car
//           </Link>
//         </div>
//       </div>

//       {filteredCars.length > 0 ? (
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {filteredCars.map((car) => (
//             <CarCard
//               key={car._id}
//               car={car}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//           <svg
//             className="mx-auto h-12 w-12 text-gray-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-900">No cars found</h3>
//           <p className="mt-1 text-gray-500">
//             {searchTerm ? 'Try a different search term' : 'Get started by adding a new car'}
//           </p>
//           <div className="mt-6">
//             <Link
//               to="new"
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <FiPlus className="mr-2" />
//               Add New Car
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarList;
