import React, { useState, useRef } from "react";
import { LuCrown, LuHeartHandshake } from "react-icons/lu";
import { GoVerified } from "react-icons/go";
import CarCard from "../components/common/CarCard";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Pagination from "../components/common/Pagination";
import { fetchCars } from "../services/CarService";
import { handleError } from "../utils";
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
  const resultRef = useRef(null);
  const bookRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
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
      return handleError(
        "Fill in all fields to proceed with searching or booking a car."
      );
    }

    if (pickupDate === dropoffDate) {
      return handleError(
        "Please choose a drop-off date that is at least one day after the pickup date."
      );
    }

    localStorage.setItem("rentalData", JSON.stringify(formData));
    setDataFill(true);

    const { data, error } = await fetchCars({ listingType: "rent" });
    if (data) {
      setCarRent(data);
    } else {
      handleError(error.message);
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const moveAbove = () => {
    setTimeout(() => {
      bookRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const setInputType = (e, type, fallback = "text") => {
    e.target.type = type;
    if (type === "date") {
      const today = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
        today.getDate()
      )}`;
      e.target.min = min;
      e.target.max = `${today.getFullYear()}-12-31`;
    } else if (type === "time") {
      e.target.min = "09:00";
      e.target.max = "22:00";
      e.target.step = 1800;
    }
    e.target.onblur = (ev) => {
      if (!ev.target.value) ev.target.type = fallback;
    };
  };

  return (
    <div className="bg-white text-white min-h-screen font-urbanist">
      <Header />
      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://www.bluecarrental.is/media/1/shutterstock1585351381.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-xl md:text-5xl">
            Need to <span className="text-yellow-400">Rent</span> a Luxury car?
          </h1>
          <h2 className="text-xl md:text-5xl mt-4">Send A Request</h2>
          <p className="mt-2 text-md md:text-sm max-w-xl">
            Complete the form below and we'll contact you as soon as possible
          </p>

          {/* Rental Form */}
          <div className="mt-40 px-4 overflow-x-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap items-end gap-2 justify-center"
              ref={bookRef}
            >
              <div className="w-40">
                <select
                  id="location"
                  onChange={handleChange}
                  className="p-2 rounded-xl text-black w-full border border-gray-300"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Location/City
                  </option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>

              {["pickupDate", "dropoffDate"].map((id) => (
                <div className="w-40" key={id}>
                  <input
                    id={id}
                    type="text"
                    placeholder={
                      id === "pickupDate" ? "Pick-up Date" : "Drop-off Date"
                    }
                    onFocus={(e) => setInputType(e, "date")}
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 placeholder:text-black"
                  />
                </div>
              ))}

              {["pickupTime", "dropoffTime"].map((id) => (
                <div className="w-40" key={id}>
                  <input
                    id={id}
                    type="text"
                    placeholder={
                      id === "pickupTime" ? "Pick-up Time" : "Drop-off Time"
                    }
                    onFocus={(e) => setInputType(e, "time")}
                    onChange={handleChange}
                    className="p-2 rounded-xl text-black w-full border border-gray-300 placeholder:text-black"
                  />
                </div>
              ))}

              <div className="w-40">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl w-full"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="p-6 md:p-12 bg-gray-50 text-black" ref={resultRef}>
        {dataFill ? (
          <>
            <h3 className="text-3xl text-center mb-16">
              A High <span className="text-yellow-400">Variety</span> Of Options
            </h3>
            <Pagination
              data={carRent}
              itemsPerPage={3}
              renderItem={(car) => <CarCard key={car._id} car={car} />}
              itemsWrapperClass="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
            />
          </>
        ) : (
          <div className="bg-green-600 rounded-lg py-2 px-2 text-center text-white">
            To search or book a car, please fill in all the above fields
          </div>
        )}
      </div>

      {/* Services */}
      <div className="py-16 px-6 md:px-16 bg-white text-black text-center">
        <h2 className="text-3xl md:text-3xl">
          Travel to Your Destination in <br />
          <span className="text-yellow-400">Ultimate</span> Comfort.
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div className="flex flex-col">
            <LuCrown
              size={42}
              className="bg-green-100 text-green-600 rounded-full p-2 mb-4"
            />
            <h3 className="text-xl">Premium Support</h3>
            <p className="text-gray-600 mt-2 max-w-xs">
              Our dedicated customer support team is available around the clock.
            </p>
          </div>
          <div className="flex flex-col">
            <GoVerified
              size={42}
              className="bg-green-100 text-green-600 rounded-full p-2 mb-4"
            />
            <h3 className="text-xl">High Quality</h3>
            <p className="text-gray-600 mt-2 max-w-xs">
              Vehicles are thoroughly inspected and maintained to the highest
              standards.
            </p>
          </div>
          <div className="flex flex-col">
            <LuHeartHandshake
              size={42}
              className="bg-green-100 text-green-600 rounded-full p-2 mb-4"
            />
            <h3 className="text-xl">A Diverse Selection</h3>
            <p className="text-gray-600 mt-2 max-w-xs">
              Choose from a wide range of vehicles, from economy to luxury.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <img
            src="https://images.pexels.com/photos/4895421/pexels-photo-4895421.jpeg"
            alt="People with cars"
            className="mx-auto rounded-2xl shadow-lg max-w-6xl w-full"
          />
        </div>
      </div>

      {/* Safety Section */}
      <div className="bg-white text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl mb-4">
              We Care Of Your <span className="text-yellow-500">Safety</span>{" "}
              And Convenience
            </h2>
            <p className="text-gray-600 mb-6">
              Well-maintained vehicles and a seamless booking experience.
            </p>

            <a>
              <button
                onClick={moveAbove}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Book Now
              </button>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/4606346/pexels-photo-4606346.jpeg"
              alt="Driving"
              className="rounded-xl object-cover"
            />
            <img
              src="https://images.pexels.com/photos/25189116/pexels-photo-25189116.jpeg"
              alt="Car Interior"
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Premium Cars Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-12">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://apgarage.ch/wp-content/uploads/2023/04/2op-671x1024.jpg"
              alt="Luxury Car"
              className="rounded-xl object-cover"
            />
            <img
              src="https://img.freepik.com/free-photo/woman-hugging-new-white-car_1303-28801.jpg"
              alt="Happy Client"
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center pl-8">
            <h3 className="text-3xl mb-4">
              Premium Cars <span className="text-yellow-500">Rental</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Choose high-end vehicles that offer comfort, style, and
              performance.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-2xl">20+</p>
                <p className="text-gray-600">Years of experience</p>
              </div>
              <div>
                <p className="text-2xl">150K</p>
                <p className="text-gray-600">Satisfied clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CarRental;
