import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuCrown, LuHeartHandshake } from "react-icons/lu";
import { GoVerified } from "react-icons/go";
import CarCard from "../components/common/CarCard";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Pagination from "../components/common/Pagination";
import { fetchCars } from "../services/CarService";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const CarRental = () => {
  const [carRent, setCarRent] = useState([]);
  const [dataFill, setDataFill] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    pickupDate: "",
    pickupTime: "",
    dropoffDate: "",
    dropoffTime: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [id]: value,
      };

      // Check when the pickup and dropoff data same show and error

      // const { pickupDate, dropoffDate } = newFormData;
      // if (pickupDate && dropoffDate && pickupDate === dropoffDate) {
      //   handleError("Please select a drop-off date that's after your pickup date.");
      // }

      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { location, pickupDate, pickupTime, dropoffDate, dropoffTime } =
      formData;

    if (
      !location ||
      !pickupDate ||
      !pickupTime ||
      !dropoffDate ||
      !dropoffTime
    ) {
      handleError(
        "Fill in all fields to proceed with searching or booking a car"
      );
      return;
    }
    if (pickupDate === dropoffDate) {
      handleError(
        "Please choose a drop-off date that is at least one day after the pickup date"
      );
      return;
    }

    localStorage.setItem("rentalData", JSON.stringify(formData));
    setDataFill(true);
    const getSaleCars = async () => {
      const { data, error } = await fetchCars({ listingType: "rent" });
      if (data) {
        setCarRent(data);
      } else {
        handleError(error.message);
      }
    };

    getSaleCars();
  };
  console.log(carRent);
  return (
    <>
      <div className="bg-white text-white min-h-screen font-urbanist">
        <Header />
        {/* Header Section */}
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://www.bluecarrental.is/media/1/shutterstock1585351381.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-xl md:text-5xl ">
              Nee to <span className="text-yellow-400">Rent</span> a Luxury car?
            </h1>
            <h2 className="text-xl md:text-5xl mt-4">Send A Request</h2>
            <p className="mt-2 text-md md:text-sm max-w-xl">
              Complete the form below and we'll contact you as soon as possible
            </p>

            {/* Form */}

            <div className="mt-32 px-4 overflow-x-auto">
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap items-end gap-2 justify-center"
              >
                <div className="w-40">
                  <select
                    id="location"
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Location/City
                    </option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>
                </div>

                {/* Pick-up Date */}
                <div className="w-40">
                  <input
                    id="pickupDate"
                    type="text"
                    placeholder="Pick-up Date"
                    onFocus={(e) => {
                      const today = new Date();
                      const year = today.getFullYear();

                      // Format dates as YYYY-MM-DD
                      const pad = (n) => String(n).padStart(2, "0");
                      const minDate = `${year}-${pad(
                        today.getMonth() + 1
                      )}-${pad(today.getDate())}`;
                      const maxDate = `${year}-12-31`;

                      e.target.type = "date";
                      e.target.min = minDate;
                      e.target.max = maxDate;
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-black"
                  />
                </div>

                {/* Pick-up Time */}
                <div className="w-40">
                  <input
                    id="pickupTime"
                    type="text"
                    placeholder="Pick-up Time"
                    onFocus={(e) => {
                      // Ensure the input stays of type 'time' on focus, and set min/max/step
                      e.target.type = "time";
                      e.target.min = "09:00";
                      e.target.max = "22:00";
                      e.target.step = 1800;
                    }}
                    onBlur={(e) => {
                      // Switch back to 'text' type when blurred if no value is entered
                      if (!e.target.value) {
                        e.target.type = "text";
                      }
                    }}
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-black"
                  />
                </div>

                {/* Drop-off Date */}
                <div className="w-40">
                  <input
                    id="dropoffDate"
                    type="text"
                    placeholder="Drop-off Date"
                    onFocus={(e) => {
                      const today = new Date();
                      const year = today.getFullYear();

                      // Format dates as YYYY-MM-DD
                      const pad = (n) => String(n).padStart(2, "0");
                      const minDate = `${year}-${pad(
                        today.getMonth() + 1
                      )}-${pad(today.getDate())}`;
                      const maxDate = `${year}-12-31`;

                      e.target.type = "date";
                      e.target.min = minDate;
                      e.target.max = maxDate;
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-black"
                  />
                </div>

                {/* Drop-off Time */}
                <div className="w-40">
                  <input
                    id="dropoffTime"
                    type="text"
                    placeholder="Drop-off Time"
                    onFocus={(e) => {
                      // Ensure the input stays of type 'time' on focus, and set min/max/step
                      e.target.type = "time";
                      e.target.min = "09:00";
                      e.target.max = "22:00";
                      e.target.step = 1800;
                    }}
                    onBlur={(e) => {
                      // Switch back to 'text' type when blurred if no value is entered
                      if (!e.target.value) {
                        e.target.type = "text";
                      }
                    }}
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-black"
                  />
                </div>

                <div className="w-40">
                  <button
                    id="booking"
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl w-full transition duration-200"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Section 3: Pricing Options */}
        <div className="p-6 md:p-12 bg-gray-50 text-black">
          {dataFill ? (
            <>
              <h3 className="text-3xl  text-center mb-16">
                A High <span className="text-yellow-400">Variety</span> Of
                Options
              </h3>
              {/* Pagination Component */}
              <Pagination
                data={carRent}
                itemsPerPage={3}
                renderItem={(car) => <CarCard key={car._id} car={car} />}
                itemsWrapperClass="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
              />{" "}
            </>
          ) : (
            <div className="bg-green-600 rounded-lg py-2 px-2 text-center text-white">
              To search or book a car, please fill in all the above fields
            </div>
          )}
        </div>
        {/* Services Section */}
        <div className="py-16 px-6 md:px-16 bg-white text-black text-center">
          <h2 className="text-3xl md:text-3xl">
            Travel to Your Destination in <br />
            <span className="text-yellow-400">Ultimate</span> Comfort.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {/* Premium Support */}
            <div className="flex flex-col">
              <LuCrown
                size={42}
                className="bg-green-100 text-green-600 rounded-full p-2 mb-4"
              />
              <h3 className="text-xl ">Premium Support</h3>
              <p className="text-gray-600 mt-2 max-w-xs ">
                Our dedicated customer support team is available around the
                clock, providing you with assistance whenever you need it.
              </p>
            </div>

            {/* High Quality */}
            <div className="flex flex-col ">
              <GoVerified
                size={42}
                className="bg-green-100 text-green-600 rounded-full p-2 mb-4"
              />
              <h3 className="text-xl ">High Quality</h3>
              <p className="text-gray-600 mt-2 max-w-xs">
                Our vehicles are thoroughly inspected and maintained to the
                highest standards, guaranteeing a smooth and reliable ride.
              </p>
            </div>

            {/* Diverse Selection */}
            <div className="flex flex-col">
              <LuHeartHandshake
                size={42}
                className="bg-green-100 text-green-600 rounded-full p-2 mb-4"
              />
              <h3 className="text-xl ">A Diverse Selection</h3>
              <p className="text-gray-600 mt-2 max-w-xs">
                Choose from a wide range of vehicles, from economy options to
                luxury cars, to suit your preferences and needs.
              </p>
            </div>
          </div>

          {/* Video/Image Section */}
          <div className="mt-12">
            <img
              src="https://images.pexels.com/photos/4895421/pexels-photo-4895421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="People with cars"
              className="mx-auto rounded-2xl shadow-lg max-w-6xl w-full"
            />
          </div>
        </div>
        <div className="bg-white text-gray-800">
          {/* Section 1: Safety and Convenience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-3xl mb-4">
                We Care Of Your <span className="text-yellow-500">Safety</span>
                <br />
                And Convenience
              </h2>
              <p className="text-gray-600 mb-6">
                We put your safety and convenience first, offering
                well-maintained vehicles and a seamless experience to ensure a
                worry-free journey every time.
              </p>
              <a href="#booking">
                <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-fit">
                  Book Now
                </button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/4606346/pexels-photo-4606346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Safety and Driving"
                className="rounded-xl object-cover"
              />
              <img
                src="https://images.pexels.com/photos/25189116/pexels-photo-25189116/free-photo-of-steering-wheel-in-bmw.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                alt="Safety and Driving"
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Section 2: Premium Cars Rental */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-12">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://apgarage.ch/wp-content/uploads/2023/04/2op-671x1024.jpg"
                alt="Car Presentation"
                className="rounded-xl object-cover"
              />
              <img
                src="https://img.freepik.com/free-photo/woman-hugging-new-white-car_1303-28801.jpg?semt=ais_hybrid&w=740"
                alt="Car Presentation"
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-col justify-center pl-8">
              <h3 className="text-3xl   mb-4">
                Premium Cars <span className="text-yellow-500">Rental</span>
              </h3>
              <p className="text-gray-600 mb-4">
                Experience the luxury of driving with our premium car rental
                service. Choose from an exclusive range of high-end vehicles
                that offer top-tier comfort, style, and performance for your
                journeys.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl ">20+</p>
                  <p className="text-gray-600">Years of experience</p>
                </div>
                <div>
                  <p className="text-2xl ">150K</p>
                  <p className="text-gray-600">Satisfied clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default CarRental;
