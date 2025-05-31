// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../../utils";

// export default function CarSaleForm() {
//   const { state } = useLocation();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const car = state?.car;
//   const typeParam = searchParams.get("type");
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     cnic: "",
//     phoneNo: "",
//     address: "",
//   });
//   const [rentalDetails, setRentalDetails] = useState({
//     location: "",
//     pickupDateTime: null,
//     dropoffDateTime: null,
//   });

//   // Decode user from token
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     try {
//       if (token) {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       }
//     } catch (err) {
//       console.error("Invalid token", err);
//       setUser(null);
//     }
//   }, []);

//   // Determine form type ( rentals)
//   useEffect(() => {
//     if (typeParam === "rental") {
//       try {
//         const rentalData = JSON.parse(localStorage.getItem("rentalData"));
//         if (!rentalData) {
//           handleError("No rental data found.");
//           throw new Error("No rental data found.");
//         }

//         setRentalDetails({
//           location: rentalData.location,
//           pickupDateTime: new Date(
//             `${rentalData.pickupDate}T${rentalData.pickupTime}`
//           ),
//           dropoffDateTime: new Date(
//             `${rentalData.dropoffDate}T${rentalData.dropoffTime}`
//           ),
//         });
//       } catch (err) {
//         handleSuccess(
//           err || "Please complete rental details before submitting."
//         );
//         setTimeout(() => navigate(-1), 2000);
//       }
//     }
//   }, [searchParams, navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !car) {
//       handleError("Missing user or car data.");
//       return;
//     }

//     if (
//       typeParam === "rental" &&
//       (!rentalDetails.location ||
//         !rentalDetails.pickupDateTime ||
//         !rentalDetails.dropoffDateTime)
//     ) {
//       handleError("Please fill in all rental details.");
//       return;
//     }

//     const { name, cnic, phoneNo, address } = formData;

//     const basePayload = {
//       carId: car._id,
//       userId: user._id,
//       price: car.price,
//       name,
//       cnic,
//       phoneNo,
//       address,
//     };

//     const fullPayload =
//       typeParam === "rental"
//         ? {
//             ...basePayload,
//             location: rentalDetails.location,
//             pickupDateTime: rentalDetails.pickupDateTime.toISOString(),
//             dropoffDateTime: rentalDetails.dropoffDateTime.toISOString(),
//           }
//         : basePayload;

//     const endpoint =
//       typeParam === "rental"
//         ? "http://localhost:8080/api/rentals/"
//         : "http://localhost:8080/api/sales/insert";

//     try {
//       const res = await axios.post(endpoint, fullPayload);
//       handleSuccess(res.data.message || "Submitted successfully.");

//       setTimeout(() => {
//         navigate(-1);
//       }, 2500);
//     } catch (error) {
//       handleError(
//         error.response?.data?.error ||
//           error.response?.data?.message ||
//           "Submission failed."
//       );
//     }
//   };

//   if (!car)
//     return <div className="text-center p-10 text-white">Missing car data.</div>;

//   if (!user)
//     return (
//       <div className="text-center p-10 text-white">User not authenticated.</div>
//     );

//   return (
//     <div className="relative min-h-screen bg-gray-900 font-urbanist text-black">
//       <div className="relative z-10 flex items-center justify-center min-h-screen">
//         <div className="bg-white shadow-2xl rounded-xl p-4 w-full max-w-lg">
//           <h2 className="text-2xl font-bold text-center mb-4">
//             {typeParam === "rental" ? "Confirm Rental" : "Confirm Purchase"}
//           </h2>

//           <div className="bg-gray-100 p-4 flex gap-4 rounded mb-4 text-sm">
//             <img
//               className="w-28 h-24 object-cover rounded"
//               src={`http://localhost:8080/${car.images[0]}`}
//               alt={car.make}
//             />
//             <div>
//               <p>
//                 <strong>Car:</strong> {car.make} {car.model}
//               </p>
//               <p>
//                 <strong>Price:</strong> Rs {car.price}/-
//               </p>
//               <p>
//                 <strong>Seats:</strong> {car.seatingCapacity}
//               </p>
//               {typeParam === "rental" && (
//                 <>
//                   <p>
//                     <strong>Location:</strong> {rentalDetails.location}
//                   </p>
//                   <p>
//                     <strong>Pickup:</strong>{" "}
//                     {rentalDetails.pickupDateTime?.toLocaleString()}
//                   </p>
//                   <p>
//                     <strong>Dropoff:</strong>{" "}
//                     {rentalDetails.dropoffDateTime?.toLocaleString()}
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>

//           {message && (
//             <p className="mt-4 text-center text-green-600">{message}</p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="name"
//               type="text"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Enter Full Name"
//               maxLength={25}
//             />
//             <input
//               name="cnic"
//               type="text"
//               pattern="\d{13}"
//               maxLength={13}
//               required
//               value={formData.cnic}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Enter CNIC (13 digits)"
//               title="Enter 13-digit CNIC number"
//             />
//             <input
//               name="phoneNo"
//               type="text"
//               pattern="\d{11}"
//               maxLength={11}
//               required
//               value={formData.phoneNo}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Phone Number (11 digits)"
//               title="Enter 11-digit phone number"
//             />
//             <textarea
//               name="address"
//               required
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               placeholder="Address"
//             />
//             <div className="flex gap-4">
//               <button
//                 className="basis-[30%] bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="basis-[70%] bg-green-600 text-white py-2 rounded hover:bg-green-700"
//               >
//                 {typeParam === "rental" ? "Rent" : "Buy"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

export default function CarSaleForm() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const car = state?.car;
  const typeParam = searchParams.get("type");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phoneNo: "",
    address: "",
  });
  const [rentalDetails, setRentalDetails] = useState({
    location: "",
    pickupDateTime: null,
    dropoffDateTime: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded);
      }
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (typeParam === "rental") {
      try {
        const rentalData = JSON.parse(localStorage.getItem("rentalData"));
        if (!rentalData) {
          handleError("No rental data found.");
          throw new Error("No rental data found.");
        }

        setRentalDetails({
          location: rentalData.location,
          pickupDateTime: new Date(
            `${rentalData.pickupDate}T${rentalData.pickupTime}`
          ),
          dropoffDateTime: new Date(
            `${rentalData.dropoffDate}T${rentalData.dropoffTime}`
          ),
        });
      } catch (err) {
        handleSuccess(
          err || "Please complete rental details before submitting."
        );
        setTimeout(() => navigate(-1), 2000);
      }
    }
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !car) {
      handleError("Missing user or car data.");
      return;
    }

    if (
      typeParam === "rental" &&
      (!rentalDetails.location ||
        !rentalDetails.pickupDateTime ||
        !rentalDetails.dropoffDateTime)
    ) {
      handleError("Please fill in all rental details.");
      return;
    }

    const { name, cnic, phoneNo, address } = formData;
    const basePayload = {
      carId: car._id,
      userId: user._id,
      price: car.price,
      name,
      cnic,
      phoneNo,
      address,
    };

    const fullPayload =
      typeParam === "rental"
        ? {
            ...basePayload,
            location: rentalDetails.location,
            pickupDateTime: rentalDetails.pickupDateTime.toISOString(),
            dropoffDateTime: rentalDetails.dropoffDateTime.toISOString(),
          }
        : basePayload;

    const endpoint =
      typeParam === "rental"
        ? "http://localhost:8080/api/rentals/"
        : "http://localhost:8080/api/sales/insert";

    try {
      const res = await axios.post(endpoint, fullPayload);
      handleSuccess(res.data.message || "Submitted successfully.");
      setTimeout(() => navigate(-1), 2500);
    } catch (error) {
      handleError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Submission failed."
      );
    }
  };

  if (!car)
    return <div className="text-center p-10 text-white">Missing car data.</div>;

  if (!user)
    return (
      <div className="text-center p-10 text-white">User not authenticated.</div>
    );

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8 font-urbanist">
    //   <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
    //     <div className="p-8">
    //       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
    //         {typeParam === "rental" ? "Confirm Rental" : "Confirm Purchase"}
    //       </h2>

    //       <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
    //         <img
    //           className="w-28 h-24 object-cover rounded-lg border"
    //           src={`http://localhost:8080/${car.images[0]}`}
    //           alt={car.make}
    //         />
    //         <div className="text-sm text-gray-700 space-y-1">
    //           <p><strong>Car:</strong> {car.make} {car.model}</p>
    //           <p><strong>Price:</strong> Rs {car.price}/-</p>
    //           <p><strong>Seats:</strong> {car.seatingCapacity}</p>
    //           {typeParam === "rental" && (
    //             <>
    //               <p><strong>Location:</strong> {rentalDetails.location}</p>
    //               <p><strong>Pickup:</strong> {rentalDetails.pickupDateTime?.toLocaleString()}</p>
    //               <p><strong>Dropoff:</strong> {rentalDetails.dropoffDateTime?.toLocaleString()}</p>
    //             </>
    //           )}
    //         </div>
    //       </div>

    //       {message && (
    //         <p className="mt-2 text-center text-green-600 font-medium">{message}</p>
    //       )}

    //       <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-2">
    //         <input
    //           name="name"
    //           type="text"
    //           required
    //           value={formData.name}
    //           onChange={handleChange}
    //           maxLength={25}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    //           placeholder="Enter Full Name"
    //         />
    //         <input
    //           name="cnic"
    //           type="text"
    //           pattern="\d{13}"
    //           maxLength={13}
    //           required
    //           value={formData.cnic}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    //           placeholder="Enter CNIC (13 digits)"
    //           title="Enter 13-digit CNIC number"
    //         />
    //         <input
    //           name="phoneNo"
    //           type="text"
    //           pattern="\d{11}"
    //           maxLength={11}
    //           required
    //           value={formData.phoneNo}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    //           placeholder="Phone Number (11 digits)"
    //           title="Enter 11-digit phone number"
    //         />
    //         <textarea
    //           name="address"
    //           required
    //           value={formData.address}
    //           onChange={handleChange}
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    //           placeholder="Enter Address"
    //         />

    //         <div className="flex justify-between gap-4 pt-2">
    //           <button
    //             type="button"
    //             onClick={() => navigate(-1)}
    //             className="w-1/3 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             type="submit"
    //             className="w-2/3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
    //           >
    //             {typeParam === "rental" ? "Rent" : "Buy"}
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div>

    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all font-urbanist">
      <div className="p-10 sm:p-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
          {typeParam === "rental" ? "Confirm Rental" : "Confirm Purchase"}
        </h2>

        {/* Car Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-100 p-6 rounded-xl mb-10 shadow-inner">
          <img
            className="w-44 h-36 object-cover rounded-xl border border-gray-300 shadow"
            src={`http://localhost:8080/${car.images[0]}`}
            alt={car.make}
          />
          <div className="text-base text-gray-700 space-y-1 w-full sm:w-auto">
            <p>
              <strong>Car:</strong> {car.make} {car.model}
            </p>
            <p>
              <strong>Price:</strong> Rs {car.price}/-
            </p>
            <p>
              <strong>Seats:</strong> {car.seatingCapacity}
            </p>
            {typeParam === "rental" && (
              <>
                <p>
                  <strong>Location:</strong> {rentalDetails.location}
                </p>
                <p>
                  <strong>Pickup:</strong>{" "}
                  {rentalDetails.pickupDateTime?.toLocaleString()}
                </p>
                <p>
                  <strong>Dropoff:</strong>{" "}
                  {rentalDetails.dropoffDateTime?.toLocaleString()}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Success message */}
        {message && (
          <p className="mb-6 text-center text-green-600 font-semibold">
            {message}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            maxLength={25}
            className="px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Full Name"
          />
          <input
            name="cnic"
            type="text"
            pattern="\d{13}"
            maxLength={13}
            required
            value={formData.cnic}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="CNIC (13 digits)"
            title="Enter 13-digit CNIC number"
          />
          <input
            name="phoneNo"
            type="text"
            pattern="\d{11}"
            maxLength={11}
            required
            value={formData.phoneNo}
            onChange={handleChange}
            className="px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Phone Number (11 digits)"
            title="Enter 11-digit phone number"
          />
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="sm:col-span-2 px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter Address"
            rows={2}
          />

          {/* Buttons */}
          <div className="sm:col-span-3 flex flex-col sm:flex-row justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-1/3 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-2/3 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
            >
              {typeParam === "rental" ? "Rent" : "Buy"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
