// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FiEdit,
//   FiTrash2,
//   FiStar,
//   FiUsers,
//   FiLayers,
// } from "react-icons/fi";
// import { GiCarDoor, GiGasPump, GiGearStick } from "react-icons/gi";

// const CarCard = ({ car, onDelete }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden w-64 text-sm font-urbanist text-gray-800 hover:shadow-lg transition-shadow duration-300">
//       {/* Image */}
//       <div className="h-36 relative overflow-hidden group">
//         <img
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           src={
//             car?.images?.length > 0
//               ? `http://localhost:8080/${car.images[0]}`
//               : "https://via.placeholder.com/600x400?text=No+Image"
//           }
//           alt={`${car.make} ${car.model}`}
//         />
//         {/* <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full text-[11px] text-gray-800 flex items-center shadow">
//           <FiStar className="text-yellow-400 mr-1" size={12} />
//           {car.ratings || "4.5"}
//         </div> */}
//         <div className="absolute top-2 right-2 bg-green-600 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow">
//           ₹{car.price?.toLocaleString() || "50,00,000"}/-
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col gap-2">
//         <div className="flex justify-between items-start">
//           <h4 className="font-bold text-gray-900 text-base truncate">
//             {car.make || "Ferrari"} {car.model || "2024"}
//           </h4>
//           <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
//             {car.year || "Year"}
//           </span>
//         </div>

//         <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
//           <div className="flex items-center">
//             <GiGearStick size={12} className="mr-1 text-green-600" />
//             {car.transmission || "Automatic"}
//           </div>
//           <div className="flex items-center">
//             <GiGasPump size={12} className="mr-1 text-green-600" />
//             {car.fuelType || "Petrol"}
//           </div>
//           <div className="flex items-center">
//             <FiLayers size={12} className="mr-1 text-green-600" />
//             {car.mileage || "16"} kmpl
//           </div>
//           <div className="flex items-center">
//             <FiUsers size={12} className="mr-1 text-green-600" />
//             {car.seatingCapacity || 4} seats
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-2 text-gray-600 text-xs line-clamp-3">
//           {car.description || "No description provided."}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
//           <span
//             className={`text-[11px] px-2 py-1 rounded-full font-medium ${
//               car.status === "available"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {car.status || "available"}
//           </span>
//           <div className="flex gap-2">
//             <Link to={`${car._id}/edit`}>
//               <button className="p-1.5 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
//                 <FiEdit size={14} />
//               </button>
//             </Link>
//             <button
//               onClick={() => onDelete(car._id)}
//               className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
//             >
//               <FiTrash2 size={14} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarCard;




import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiStar, FiUsers, FiLayers } from "react-icons/fi";
import { GiCarDoor, GiGasPump, GiGearStick } from "react-icons/gi";

const CarCard = ({ car, onDelete }) => {
  const imageUrl = car?.images?.length > 0
    ? `http://localhost:8080/${car.images[0]}`
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-64 text-sm text-gray-800 hover:shadow-lg transition-shadow duration-300 font-urbanist">
      {/* Image */}
      <div className="h-36 relative overflow-hidden group">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
          alt={`${car.make || 'Car'} ${car.model || 'Model'}`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow">
          ₹{car.price?.toLocaleString() || "50,00,000"}/-
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-900 text-base truncate">
            {car.make || "Ferrari"} {car.model || "2024"}
          </h4>
          <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
            {car.year || "Year"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          <div className="flex items-center">
            <GiGearStick size={12} className="mr-1 text-green-600" />
            {car.transmission || "Automatic"}
          </div>
          <div className="flex items-center">
            <GiGasPump size={12} className="mr-1 text-green-600" />
            {car.fuelType || "Petrol"}
          </div>
          <div className="flex items-center">
            <FiLayers size={12} className="mr-1 text-green-600" />
            {car.mileage || "16"} kmpl
          </div>
          <div className="flex items-center">
            <FiUsers size={12} className="mr-1 text-green-600" />
            {car.seatingCapacity || 4} seats
          </div>
        </div>

        {/* Description */}
        {/* <div className="mt-2 text-gray-600 text-xs line-clamp-3">
          {car.description || "No description provided."}
        </div> */}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
          <span
            className={`text-[11px] px-2 py-1 rounded-full font-medium ${
              car.status === "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {car.status || "available"}
          </span>
          <div className="flex gap-2">
            <Link to={`${car._id}/edit`}>
              <button
                className="p-1.5 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                aria-label="Edit car"
              >
                <FiEdit size={14} />
              </button>
            </Link>
            <button
              onClick={() => onDelete(car._id)}
              className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              aria-label="Delete car"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
