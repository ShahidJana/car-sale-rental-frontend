import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

export default function CarSaleForm() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const car = state?.car;
  const typeParam = searchParams.get("type");
  const [user, setUser] = useState(null);
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

    const { name, cnic, phoneNo, address } = formData;

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

    // const { name, cnic, phoneNo, address } = formData;
    const basePayload = {
      carId: car._id,
      userId: user._id,
      price: car.price,
      name,
      cnic,
      phoneNo,
      address,
    };

    if (!name || !cnic || !phoneNo || !address) {
      handleError("All fields are required.");
      return;
    }

    if (!/^\d{13}$/.test(cnic)) {
      handleError("CNIC must be exactly 13 digits.");
      return;
    }

    if (!/^\d{11}$/.test(phoneNo)) {
      handleError("Phone number must be exactly 11 digits.");
      return;
    }

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

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (!car)
    return <div className="text-center p-10 text-white">Missing car data.</div>;

  if (!user)
    return (
      <div className="text-center p-10 text-white">User not authenticated.</div>
    );

  return (
    <>
      <div className="max-w-full mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200 relative transition-all duration-300 font-urbanist">
        <h2 className="text-2xl font-semibold text-center text-gray-800 m-4 tracking-tight">
          {typeParam === "rental" ? "Confirm Rental" : "Confirm Purchase"}
        </h2>

        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gray-900 transform rotate-45 translate-x-8 -translate-y-8 z-10"></div>

        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50">
          <div className="flex flex-col items-center gap-2 sm:w-1/3">
            <img
              src={car?.images[0]?.url}
              alt={car?.make}
              className="w-32 h-auto object-contain drop-shadow-sm"
            />
            <div className="text-center font-semibold text-gray-800 text-base">
              {car.make} {car.model}
              <div className="text-xs text-gray-500">({car.year})</div>
            </div>
          </div>

          <div className="flex-1 text-sm text-gray-800">
            <div className="text-base font-bold mb-4 text-green-700 border-b pb-2 border-dashed uppercase tracking-wide">
              Summary
            </div>

            {typeParam === "rental" ? (
              <>
                <div className="flex justify-between text-xs mb-4">
                  <div className="text-center">
                    <div className="font-medium text-gray-700">
                      {rentalDetails.pickupDateTime?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-gray-500">
                      {rentalDetails.pickupDateTime?.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="self-center text-gray-500 font-semibold">
                    to
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-700">
                      {rentalDetails.dropoffDateTime?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-gray-500">
                      {rentalDetails.dropoffDateTime?.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                  {rentalDetails.location}
                </div>
                <div className="flex justify-between text-xs text-gray-700">
                  <div>
                    <span>Kilometer Limit</span>
                    <div className="font-bold text-sm mt-1">180 km</div>
                  </div>
                  <div>
                    <span>Excess Charges</span>
                    <div className="font-bold text-sm mt-1">₹100/km</div>
                  </div>
                </div>
              </>
            ) : (
              " "
            )}

            {/* Total */}
            <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-5 border-t pt-3 border-gray-300">
              <span>Total Amount</span>
              {typeParam === "rental" ? (
                <span>₹{car.price}/day</span>
              ) : (
                <span>₹{car.price}</span>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 pt-4 bg-white text-sm"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              maxLength={25}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
              placeholder="Enter your full name"
            />
          </div>

          {/* CNIC */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cnic" className="font-medium text-gray-700">
              CNIC
            </label>
            <input
              id="cnic"
              name="cnic"
              type="text"
              value={formData.cnic}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
              placeholder="13-digit CNIC number"
              title="Enter 13-digit CNIC number"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phoneNo" className="font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNo"
              name="phoneNo"
              type="text"
              value={formData.phoneNo}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
              placeholder="11-digit phone number"
              title="Enter 11-digit phone number"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2 flex flex-col gap-1">
            <label htmlFor="address" className="font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
              placeholder="Enter your full address"
              rows={2}
            />
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex flex-col sm:flex-row justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-1/3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow hover:shadow-lg transition duration-300 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-2/3 text-white py-2 rounded-lg font-medium text-sm transition duration-300 shadow 
    ${
      loading
        ? "bg-green-600 cursor-not-allowed"
        : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:shadow-lg"
    }
  `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  Processing...
                </span>
              ) : typeParam === "rental" ? (
                "Rent Now"
              ) : (
                "Buy Now"
              )}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
