import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchBar } from "../../../components/common/SearchBar";
import DetailCard from "../../../components/common/DetailCard";
import { handleError, handleSuccess } from "../../../utils";

const API_URL = "http://localhost:8080/api";

export default function SaleCarDetails() {
  const [saleCars, setSaleCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phoneNo: "",
    address: "",
    saleDate: "",
    carId: "",
  });

  // Fetch sales and cars data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [salesRes, carsRes] = await Promise.all([
        axios.get(`${API_URL}/sales/`),
        axios.get(`${API_URL}/cars`),
      ]);
      setSaleCars(salesRes.data.sales || []);
      setCars(carsRes.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete sale record
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/sales/${id}`);
      setSaleCars((prev) => prev.filter((car) => car._id !== id));
      handleSuccess(res.data.message || "Sale record deleted");
    } catch (err) {
      handleError(err.message);
    }
  };

  // Open form for adding new sale
  const handleAddClick = () => {
    setFormData({
      name: "",
      cnic: "",
      phoneNo: "",
      address: "",
      saleDate: "",
      carId: "",
    });
    setEditingSale(null);
    setIsFormOpen(true);
  };

  // Open form for editing existing sale
  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      cnic: item.cnic || "",
      phoneNo: item.phoneNo || "",
      address: item.address || "",
      saleDate: item.saleDate ? item.saleDate.slice(0, 16) : "",
      carId: item.carId || "",
    });
    setEditingSale(item);
    setIsFormOpen(true);
  };

  // Submit add/edit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, cnic, phoneNo, address, saleDate, carId } = formData;

    if (!carId) {
      handleError("Please select a car.");
      return;
    }

    if (!name || !cnic || !phoneNo || !address || !saleDate) {
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
    setLoading(true);
    try {
      let res;
      if (editingSale) {
        res = await axios.put(`${API_URL}/sales/${editingSale._id}`, formData);
        handleSuccess(res.data?.message || "Sale record updated successfully");
      } else {
        res = await axios.post(`${API_URL}/sales/insert`, formData);
        handleSuccess(res.data?.message || "Sale record added successfully");
      }

      setTimeout(() => {
        setIsFormOpen(false);
        fetchData();
      }, 1000);
    } catch (err) {
      console.error("Submit error:", err);
      handleError(
        err.response?.data?.message || err.message || "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter sales based on search term and car details
  const filteredCars = saleCars.filter((sale) => {
    const car = cars.find((c) => c._id === sale.carId);
    const search = searchTerm.toLowerCase();

    return (
      sale.name?.toLowerCase().includes(search) ||
      sale.cnic?.toLowerCase().includes(search) ||
      car?.make?.toLowerCase().includes(search) ||
      car?.model?.toLowerCase().includes(search) ||
      car?.year?.toString().includes(search) ||
      sale.condition?.toLowerCase().includes(search)
    );
  });

  // Custom render for DetailCard cells
  const customRender = (item, key) => {
    console.log("item and key", item, key);
    const car = cars.find((c) => c._id === item.carId);

    switch (key) {
      case "makeModel":
        if (!car) return "Loading car data...";
        return (
          <div
            className="flex items-center gap-2"
            title={`${car.make} ${car.model}`}
          >
            <img
              src={
                Array.isArray(car.images) ? car.images[0]?.url : car.images?.url
              }
              alt={`${car.make} ${car.model}`}
              className="w-12 h-12 rounded object-cover"
            />
          </div>
        );

      case "price":
        return <div className="w-32 break-words">{item.price || "-"}/-</div>;

      case "saleDate":
        if (!item.saleDate) return "N/A";
        const date = new Date(item.saleDate);
        return (
          <>
            {date.toLocaleDateString()} <br />
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </>
        );

      case "phoneNo":
        return (
          <div className="w-40">
            <div>{item.phoneNo || "-"}</div>
          </div>
        );

      case "address":
        return (
          <div className="group max-w-[180px]">
            {/* Truncated address (2 lines max) */}
            <div
              className="overflow-hidden text-gray-800 transition-opacity duration-150 ease-in-out group-hover:hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              <span title={item.address}>{item.address || "-"}</span>
            </div>
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
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 sm:p-6">
          <form
            onSubmit={handleFormSubmit}
            autoComplete="off"
            className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingSale ? "Edit Sale" : "Add Sale"}
            </h2>

            {/* Car Selection */}
            <div className="md:col-span-2 flex flex-col">
              <label
                htmlFor="carId"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Select Car
              </label>
              <select
                id="carId"
                value={formData.carId}
                onChange={(e) => {
                  const selectedCar = cars.find(
                    (car) => car._id === e.target.value
                  );
                  setFormData({
                    ...formData,
                    carId: e.target.value,
                    price: selectedCar?.price || "",
                  });
                }}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select Car</option>
                {cars
                  .filter((car) => car.listingType?.toLowerCase() === "sale")
                  .map((car) => (
                    <option key={car._id} value={car._id}>
                      {car.make} {car.model} ({car.year})
                    </option>
                  ))}
              </select>
            </div>

            {/* Car Price (Read-only Field) */}
            {formData.price && (
              <div className="md:col-span-2 flex flex-col">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Car Price
                </label>
                <input
                  id="price"
                  type="text"
                  value={formData.price}
                  readOnly
                  className="p-2 border rounded bg-gray-100 text-gray-700"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "name",
                  label: "Name",
                  type: "text",
                  placeholder: "Enter Full Name",
                },
                {
                  id: "cnic",
                  label: "CNIC",
                  type: "text",
                  placeholder: "Enter 13-digit CNIC Number",
                },
                {
                  id: "phoneNo",
                  label: "Phone No",
                  type: "text",
                  placeholder: "Enter 11-digit Phone Number",
                },
                {
                  id: "address",
                  label: "Address",
                  type: "text",
                  placeholder: "Enter Address",
                },
                {
                  id: "saleDate",
                  label: "Sale Date & Time",
                  type: "datetime-local",
                  placeholder: "",
                },
              ].map(({ id, label, type, placeholder, required, pattern }) => (
                <div key={id} className="flex flex-col">
                  <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={formData[id]}
                    required={required}
                    pattern={pattern}
                    inputMode={
                      type === "text" && pattern ? "numeric" : undefined
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, [id]: e.target.value })
                    }
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              ))}
            </div>

            {/* Selected Car Preview */}
            {formData.carId &&
              (() => {
                const selectedCar = cars.find(
                  (car) =>
                    car._id === formData.carId &&
                    car.listingType?.toLowerCase() === "sale"
                );
                if (!selectedCar) return null;
                return (
                  <div className="mt-6 flex items-center gap-4 bg-gray-100 p-4 rounded">
                    <img
                      src={
                        Array.isArray(selectedCar.images)
                          ? selectedCar.images[0]?.url
                          : selectedCar.images?.url
                      }
                      alt="Selected Car"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {selectedCar.make} {selectedCar.model}
                      </p>
                      <p className="text-sm text-gray-600">
                        Year: {selectedCar.year}
                      </p>
                    </div>
                  </div>
                );
              })()}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white px-5 py-2 rounded font-medium transition ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                {loading
                  ? editingSale
                    ? "Updating..."
                    : "Adding..."
                  : editingSale
                  ? "Update"
                  : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DetailCard
        title="Sold Cars"
        subtitle="All sale records"
        totalCarTitles="Sold Cars"
        addButtonLabel="Add Sale"
        addButtonLink="#"
        headers={[
          "Make Model",
          "Name",
          "CNIC",
          "Price",
          "Sale Date-Time",
          "Phone No",
          "Address",
          "Action",
        ]}
        fieldKeys={[
          "makeModel",
          "name",
          "cnic",
          "price",
          "saleDate",
          "phoneNo",
          "address",
        ]}
        data={filteredCars}
        iconStyle1="text-green-600 hover:text-white hover:bg-green-600 p-2 rounded"
        iconStyle2="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        onAddClick={handleAddClick}
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
