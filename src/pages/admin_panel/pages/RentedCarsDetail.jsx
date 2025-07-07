import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import { SearchBar } from "../../../components/common/SearchBar";
import DetailCard from "../../../components/common/DetailCard";

const API_URL = "http://localhost:8080/api";

export default function RentCarDetails() {
  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRental, setEditingRental] = useState(null);
  const [formData, setFormData] = useState(initialFormData());

  function initialFormData() {
    return {
      name: "",
      cnic: "",
      phoneNo: "",
      address: "",
      pickupDateTime: "",
      dropoffDateTime: "",
      carId: "",
    };
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rentalsRes, carsRes] = await Promise.all([
        axios.get(`${API_URL}/rentals`),
        axios.get(`${API_URL}/cars`),
      ]);
      setRentals(rentalsRes.data);
      setCars(carsRes.data);
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/rentals/${id}`);
      setRentals((prev) => prev.filter((r) => r._id !== id));
      handleSuccess("Rental Record deleted");
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleAddClick = () => {
    setFormData(initialFormData());
    setEditingRental(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      cnic: item.cnic || "",
      phoneNo: item.phoneNo || "",
      address: item.address || "",
      pickupDateTime: item.pickupDateTime?.slice(0, 16) || "",
      dropoffDateTime: item.dropoffDateTime?.slice(0, 16) || "",
      carId: item.carId?._id || "",
    });
    setEditingRental(item);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      cnic,
      phoneNo,
      address,
      pickupDateTime,
      dropoffDateTime,
      carId,
    } = formData;

    if (!carId) {
      handleError("Please select a car.");
      return;
    }

    if (
      !name ||
      !cnic ||
      !phoneNo ||
      !address ||
      !pickupDateTime ||
      !dropoffDateTime
    ) {
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
      if (editingRental) {
        const res = await axios.put(
          `${API_URL}/rentals/${editingRental._id}`,
          formData
        );
        setRentals((prev) =>
          prev.map((r) => (r._id === editingRental._id ? res.data : r))
        );
        handleSuccess("Rental Record updated");
      } else {
        const res = await axios.post(`${API_URL}/rentals`, formData);
        setRentals((prev) => [...prev, res.data]);
        handleSuccess(res.data.message || "Rental Booked successfully");
      }
      setIsFormOpen(false);
      setTimeout(() => {
        setIsFormOpen(false);
        fetchData();
      }, 1000);
    } catch (err) {
      handleError(
        err.response?.data?.message || err.message || "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredRentals = rentals.filter((r) => {
    const car = r.carId || {};
    return (
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cnic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year?.toString().includes(searchTerm)
    );
  });

  const customRender = (item, key) => {
    const car = item.carId || {};
    switch (key) {
      case "makeModel":
        return car.make ? (
          <div className="flex items-center gap-2">
            <img
              src={
                Array.isArray(car.images) ? car.images[0]?.url : car.images?.url
              }
              alt={car.make}
              className="w-12 h-12 rounded"
            />
            <span>
              {car.make} {car.model}
            </span>
          </div>
        ) : (
          "N/A"
        );
      case "price":
        return <div className="w-32 break-words">{item.price || "-"}</div>;

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
          <div className="w-28 space-y-1 text-sm text-gray-800">
            {/* Phone Number (always visible) */}
            <div className="bg-yellow-400 rounded-md p-1" title="Phone No">
              {item.phoneNo || "-"}
            </div>

            {/* Address Hover Area */}
            <div className="group relative cursor-default">
              {/* Truncated Address (shown by default) */}
              <div
                className="overflow-hidden transition-opacity duration-150 ease-in-out group-hover:hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                <span title={item.address}>{item.address || "-"}</span>
              </div>
            </div>
          </div>
        );
      default:
        return item[key] ?? "-";
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white w-full max-w-2xl p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingRental ? "Edit Rental" : "Add Rental"}
            </h2>

            <div className="md:col-span-2 flex flex-col mb-1">
              <label htmlFor="carId" className="text-sm mb-1">
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
                  .filter((c) => c.listingType?.toLowerCase() === "rent")
                  .map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.make} {c.model} ({c.year})
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "cnic", "phoneNo", "address"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label htmlFor={field} className="text-sm mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    id={field}
                    type={
                      field === "cnic" || field === "phoneNo" ? "tel" : "text"
                    }
                    placeholder={
                      field === "cnic"
                        ? "Enter 13-digit CNIC"
                        : field === "phoneNo"
                        ? "Enter 11-digit Phone No"
                        : `Enter ${field}`
                    }
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    maxLength={
                      field === "cnic"
                        ? 13
                        : field === "phoneNo"
                        ? 11
                        : undefined
                    }
                    pattern={
                      field === "cnic"
                        ? "[0-9]{13}"
                        : field === "phoneNo"
                        ? "[0-9]{11}"
                        : undefined
                    }
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                    autoComplete="off"
                  />
                </div>
              ))}

              {["pickupDateTime", "dropoffDateTime"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label htmlFor={field} className="text-sm mb-1 capitalize">
                    {field.replace("DateTime", " Date & Time")}
                  </label>
                  <input
                    type="datetime-local"
                    id={field}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    placeholder={`Select ${field.replace(
                      "DateTime",
                      " date & time"
                    )}`}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>

            {formData.carId &&
              (() => {
                const selectedCar = cars.find((c) => c._id === formData.carId);
                return selectedCar ? (
                  <div className="mt-4 flex gap-4 items-center bg-gray-100 p-4 rounded">
                    <img
                      src={
                        Array.isArray(selectedCar.images)
                          ? selectedCar.images[0]?.url
                          : selectedCar.images?.url
                      }
                      alt="Selected"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p>
                        {selectedCar.make} {selectedCar.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        Year: {selectedCar.year}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white px-4 py-2 rounded transition ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                {loading
                  ? editingRental
                    ? "Updating..."
                    : "Adding..."
                  : editingRental
                  ? "Update"
                  : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DetailCard
        title="Rented Cars"
        subtitle="All rental booking details"
        totalCarTitles="Rented Cars"
        addButtonLabel="Add Rental"
        addButtonLink="#"
        headers={[
          "Make Model",
          "Name",
          "CNIC",
          "Price/day",
          "PU Date-Time",
          "DO Date-Time",
          "Phone No-Address",
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
        data={filteredRentals}
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
            placeholder="Search by make, model, year, name or CNIC"
          />
        }
      />

      <ToastContainer />
    </div>
  );
}
