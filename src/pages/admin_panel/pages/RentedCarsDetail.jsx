import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { SearchBar } from "../../../components/common/SearchBar";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../../utils";
import DetailCard from "../../../components/common/DetailCard";

const API_URL = "http://localhost:8080/api";

export default function RentCarDetails() {
  const [rentCars, setRentCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(`${API_URL}/rentals/`);
        setRentCars(response.data);
      } catch (err) {
        handleError(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const handleDelete = async (id) => {
    try {
     const res = await axios.delete(`${API_URL}/rentals/${id}`);
      setRentCars((res) => res.filter((car) => car._id !== id));
      handleError(res.data.message)
    } catch (err) {
      handleError(err.message);
    }
  };

  // Filter cars by name, cnic, or car properties safely
  const filteredCars = rentCars.filter((car) => {
    const carMake = car.carId?.make?.toLowerCase() || "";
    const carModel = car.carId?.model?.toLowerCase() || "";
    const carYear = car.carId?.year?.toString() || "";
    return (
      car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.cnic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carMake.includes(searchTerm.toLowerCase()) ||
      carModel.includes(searchTerm.toLowerCase()) ||
      carYear.includes(searchTerm) ||
      car.condition?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const iconStyle1 =
    "flex items-center bg-transparent p-2 text-green-600 hover:rounded-md hover:bg-green-700 hover:text-white font-urbanist";
  const iconStyle2 =
    "flex items-center p-2 text-red-600 hover:bg-red-600 hover:rounded-md hover:text-white font-bold";

  const customRender = (item, key) => {
    switch (key) {
      case "makeModel":
        return item.carId ? (
          <div className="flex items-center gap-2">
            <img
              src={`${
                Array.isArray(item.carId.images)
                  ? item.carId.images[0].url
                  : item.carId.images.url
              }`}
              alt={item.carId.make}
              className="w-12 h-12 rounded"
            />
            <span>{`${item.carId.make} ${item.carId.model}`}</span>
          </div>
        ) : (
          "Car not found"
        );

      case "name":
        return <>{item.name}</>;

      case "cnic":
        return <>{item.cnic}</>;

      case "price":
        return <>{item.price ? `${item.price}/-` : "N/A"}</>;

      case "pickup":
        return item.pickupDateTime ? (
          <>
            {new Date(item.pickupDateTime).toLocaleDateString()} <br />
            {new Date(item.pickupDateTime).toLocaleTimeString()}
          </>
        ) : (
          "N/A"
        );

      case "dropoff":
        return item.dropoffDateTime ? (
          <>
            {new Date(item.dropoffDateTime).toLocaleDateString()} <br />
            {new Date(item.dropoffDateTime).toLocaleTimeString()}
          </>
        ) : (
          "N/A"
        );

      case "contact":
        return (
          <div className="w-32 break-words">
            {item.phoneNo || "-"} <br /> {item.address || "-"}
          </div>
        );

      default:
        return item[key] ?? "-";
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
            <DetailCard
        title="Rented Cars"
        subtitle="All rental booking Details"
        totalCarTitles="Rented Cars"
        addButtonLabel="Add Rental"
        addButtonLink="/rentals/new"
        headers={[
          "Make & Model",
          "Name",
          "CNIC",
          "Price/day",
          "PU Date/Time",
          "DO Date/Time",
          "Contact/ Address",
          "Action",
        ]}
        fieldKeys={[
          "makeModel",
          "name",
          "cnic",
          "price",
          "pickup",
          "dropoff",
          "contact",
        ]}
        data={filteredCars}
        iconStyle1={iconStyle1}
        iconStyle2={iconStyle2}
        handleDelete={handleDelete}
        editLinkBase="/admin-dashboard/rented-cars"
        customRender={customRender}
        searchComponent={
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by make, model, year, name or cnic"
          />
        }
      />

      <ToastContainer />
    </div>
  );
}
