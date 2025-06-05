import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { SearchBar } from "../../../components/common/SearchBar";
import { ToastContainer } from "react-toastify";
import DetailCard from "../../../components/common/DetailCard";
import { handleError } from "../../../utils";

const API_URL = "http://localhost:8080/api";

export default function SoldCarDetails() {
  const [cars, setCars] = useState([]);
  const [saleCars, setSaleCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        if (location.pathname === "/admin-dashboard/sold-cars") {
          const response = await axios.get(`${API_URL}/sales/`);
          setSaleCars(response.data.sales);
        } else if (location.pathname === "/admin-dashboard/rented-cars") {
          const response = await axios.get(`${API_URL}/rentals/`);
          setSaleCars(response.data);
        }
        setLoading(false);
      } catch (err) {
        handleError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, [location.pathname]);

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        const carData = await Promise.all(
          saleCars.map(async (car) => {
            const res = await axios.get(`${API_URL}/cars/${car.carId}`);
            return res.data;
          })
        );
        setCars(carData);
      } catch (err) {
        handleError(err.message);
      }
    };

    if (saleCars.length > 0) getCarDetails();
  }, [saleCars]);

  const handleDelete = async (id) => {
    try {
      const url =
        location.pathname === "/admin-dashboard/sold-cars"
          ? `${API_URL}/sales/${id}`
          : `${API_URL}/rentals/${id}`;

      const res = await axios.delete(url);
      setSaleCars((prevCars) => prevCars.filter((car) => car._id !== id));
      handleError(res.data.message);
    } catch (err) {
      handleError(err.res?.data?.message || "Failed to delete car");
    }
  };

  // Filter cars based on search term (Name, Cnic and Car)
  const filteredCars = saleCars.filter(
    (car) =>
      car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.cnic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.carId?.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.carId?.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.carId?.year?.toString().includes(searchTerm) ||
      car.condition?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const iconStyle1 =
    "flex items-center bg-transparent p-2 text-green-600 hover:rounded-md hover:bg-green-700 hover:text-white font-urbanist";
  const iconStyle2 =
    "flex items-center p-2 text-red-600 hover:bg-red-600 hover:rounded-md hover:text-white font-bold";
  const customRender = (item, key) => {
    // Find the matching car for each sold car by carId
    const matchingCar = cars.find((car) => car._id === item.carId);

    switch (key) {
      case "makeModel":
        return matchingCar ? (
          <div className="flex items-center gap-2">
            <img
              src={`${
                Array.isArray(matchingCar.images)
                  ? matchingCar.images[0].url
                  : matchingCar.images.url
              }`}
              alt={matchingCar.make}
              className="w-12 h-12 rounded"
            />
            <span>{`${matchingCar.make} ${matchingCar.model}`}</span>
          </div>
        ) : (
          "Car not found"
        );

      case "price":
        return item.salePrice || item.price
          ? `${item.salePrice || item.price}/-`
          : "N/A";

      case "saleDateTime":
        return item.saleDate ? (
          <>
            {new Date(item.saleDate).toLocaleDateString()} <br />
            {new Date(item.saleDate).toLocaleTimeString()}
          </>
        ) : (
          "N/A"
        );

      case "name":
        return <>{item.name}</>;
      case "cnic":
        return <>{item.cnic}</>;

      case "contact":
        return item.phoneNo || "-";

      case "address":
        return <div className="w-32 break-words">{item.address || "-"}</div>;

      default:
        return item[key] ?? "-";
    }
  };
  if (loading) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6 space-y-6">
      <DetailCard
        title="Sold Cars"
        subtitle="Manage all sold cars"
        totalCarTitles="Sold Cars"
        addButtonLabel="Add Sale"
        addButtonLink="new-sale"
        headers={[
          "Make & Model",
          "Name ",
          "CNIC",
          "Price",
          "Date & Time",
          "Contact",
          "Address",
          "Action",
        ]}
        fieldKeys={[
          "makeModel",
          "name",
          "cnic",
          "price",
          "saleDateTime",
          "contact",
          "address",
        ]}
        data={filteredCars}
        iconStyle1={iconStyle1}
        iconStyle2={iconStyle2}
        handleDelete={handleDelete}
        editLinkBase="/admin-dashboard/sold-cars"
        customRender={customRender}
        searchComponent={
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={"Search by make, model, year, name or cnic"}
          />
        }
      />
      <ToastContainer />
    </div>
  );
}
