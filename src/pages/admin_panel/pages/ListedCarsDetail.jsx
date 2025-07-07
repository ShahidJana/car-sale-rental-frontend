import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:8080/api";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import DetailCard from "../../../components/common/DetailCard";
import { SearchBar } from "../../../components/common/SearchBar";
export default function CarDetails() {
  let [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data);
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/cars/${id}`);
      const { message } = response.data;
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      handleError(message);
    } catch (err) {
      handleError(err.response?.data?.message || "Failed to delete car");
    }
  };

  cars = cars.filter(
    (car) =>
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) +
        car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.condition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year?.toString().includes(searchTerm.toLowerCase()) ||
      car.listingType?.toString().includes(searchTerm.toLowerCase())
  );

  const iconStyle1 =
    "flex items-center bg-transparent p-2 text-green-600 hover:rounded-md hover:bg-green-700 hover:text-white font-urbanist";

  const iconStyle2 =
    "flex items-center p-2 text-red-600 hover:bg-red-600 hover:rounded-md hover:text-white font-bold";

  return (
    <div className="font-urbanist">
      <DetailCard
        title="Car Listings"
        subtitle="Manage all listed cars"
        totalCarTitles="Listed Cars"
        addButtonLabel="Add Car"
        addButtonLink="new"
        headers={[
          "Image",
          "Make Model",
          "Listing Type",
          "Price",
          "Year & Color",
          "Transmission & Fuel Type",
          "Mileage & Seats",
          "Action",
        ]}
        fieldKeys={[
          "images",
          ["make", "model"],
          "listingType",
          "price",
          ["year", "color"],
          ["transmission", "fuelType"],
          ["mileage", "seatingCapacity"],
        ]}
        data={cars}
        iconStyle1={iconStyle1}
        iconStyle2={iconStyle2}
        handleDelete={handleDelete}
        editLinkBase="/admin-dashboard/listed-cars"
        imageKey="images"
        imageAltKey="make"
        searchComponent={
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={
              "Search by make, model, year, condition or listing type "
            }
          />
        }
      />

      <ToastContainer />
    </div>
  );
}
