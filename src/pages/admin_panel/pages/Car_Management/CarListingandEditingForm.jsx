import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import {
  FaInfoCircle,
  FaListAlt,
  FaCheckCircle,
  FaImage,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../../../utils";
const CarForm = ({ isEdit = false }) => {
  const initialFormState = {
    make: "",
    model: "",
    year: "",
    price: "",
    status: "",
    condition: "",
    bodyType: "",
    serviceType: "",
    location: "",
    features: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    fuelTankCapacity: "",
    color: "",
    description: "",
    seatingCapacity: "",
    doors: "",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const match = useMatch("/sell-a-car");
  //Input Fields
  const inputFields = [
    { name: "make", label: "Make", type: "text", required: true },
    {
      name: "model",
      label: "Model",
      type: "text",
      required: true,
    },
    {
      name: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      name: "price",
      label: "Price (₹)",
      type: "number",
      required: true,
    },
    { name: "mileage", label: "Mileage (kmpl)", type: "number" },
    { name: "engine", label: "Engine (cc)", type: "number" },
    {
      name: "fuelTankCapacity",
      label: "Fuel Tank Capacity (Liters)",
      type: "number",
    },
    { name: "color", label: "Color", type: "text" },
    { name: "seatingCapacity", label: "Seats", type: "number" },
    { name: "doors", label: "Doors", type: "number" },
  ];
  //Select Options
  const selectOptions = {
    listingType: match
      ? [{ value: "ads", label: "For Sale Ads", required: true }]
      : [
          { value: "sale", label: "For Sale", required: true },
          { value: "rent", label: "For Rent", required: true },
          { value: "offer", label: "Special Offer", required: true },
          { value: "ads", label: "For Sale Ads", required: true },
        ],
    status: match
      ? [{ value: "available", label: "Available", required: false }]
      : [
          { value: "available", label: "Available", required: true },
          { value: "sold", label: "Sold", required: true },
          { value: "rented", label: "Rented", required: true },
        ],
    condition: [
      { value: "new", label: "New", required: true },
      { value: "used", label: "Used", required: true },
    ],
    bodyType: [
      { value: "sedan", label: "Sedan" },
      { value: "hatchback", label: "Hatchback" },
      { value: "suv", label: "SUV" },
      { value: "crossover", label: "Crossover" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible / Cabriolet" },
      { value: "wagon", label: "Wagon / Estate" },
      { value: "pickup", label: "Pickup Truck" },
      { value: "van", label: "Van / Minivan (MPV)" },
      { value: "roadster", label: "Roadster" },
    ],
    transmission: [
      { value: "manual", label: "Manual", required: true },
      { value: "automatic", label: "Automatic", required: true },
      { value: "cvt", label: "CVT", required: true },
    ],
    fuelType: [
      { value: "petrol", label: "Petrol", required: true },
      { value: "diesel", label: "Diesel", required: true },
      { value: "electric", label: "Electric", required: true },
      { value: "eybrid", label: "Hybrid", required: true },
      { value: "cng", label: "CNG", required: true },
    ],
  };

  useEffect(() => {
    const fetchCarData = async () => {
      if (!isEdit || !id) return;
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8080/api/cars/${id}`
        );

        if (!data) throw new Error("Car data not found");

        const {
          make = "",
          model = "",
          year = "",
          price = "",
          engine = "",
          status = "",
          condition = "",
          bodyType = "",
          location = "",
          mileage = "",
          transmission = "",
          fuelType = "",
          fuelTankCapacity = "",
          serviceType = "",
          color = "",
          description = "",
          seatingCapacity = "",
          doors = "",
          features = [],
          images = [],
        } = data;

        setFormData({
          make,
          model,
          year,
          price,
          engine,
          status,
          condition,
          bodyType,
          location,
          mileage,
          transmission,
          fuelType,
          fuelTankCapacity,
          serviceType,
          color,
          description,
          seatingCapacity,
          doors,
          features: features.join(", "),
        });

        setExistingImages(images);
      } catch (err) {
        handleError(err.message || "Failed to fetch car data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, [isEdit, id]);

  useEffect(
    () => () => imagePreviews.forEach((p) => URL.revokeObjectURL(p)),
    [imagePreviews]
  );

  const handleChange = ({ target: { name, value } }) => {
    const isNumericField = [
      "year",
      "price",
      "mileage",
      "seatingCapacity",
      "doors",
      "engine",
    ].includes(name);
    if (isNumericField && value && (isNaN(value) || Number(value) < 0)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = null;

    if (files.length + imagePreviews.length + existingImages.length > 5) {
      return handleError("Maximum 5 images allowed");
    }

    const validFiles = files.filter((file) => {
      const isValid =
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ) && file.size <= 5 * 1024 * 1024;
      if (!isValid) {
        handleError(`Invalid or too large: ${file.name}`);
      }
      return isValid;
    });

    setImages((prev) => [...prev, ...validFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      URL.revokeObjectURL(imagePreviews[index]);
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value != null) form.append(key, value.toString());
      });

      images.forEach((image) => form.append("images", image));
      if (isEdit) {
        // for (let i = 0; i < existingImages.length; i++) {
        //   form.append("images", existingImages[i]);

        // }
        existingImages.forEach((img) => {
          form.append("images", JSON.stringify(img)); 
        });
      }

      const method = isEdit ? "put" : "post";
      const url = isEdit
        ? `http://localhost:8080/api/cars/${id}/update`
        : `http://localhost:8080/api/cars/insert`;

      await axios[method](url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleSuccess(`Car Record ${isEdit ? "updated" : "created"} !`);
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.error || err.message || "Unexpected error";
      handleError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-lg mt-4 sm:mt-8 mb-12 border border-gray-200 font-urbanist">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-green-600 mb-2">
          {match
            ? "Post Your Car for Sale"
            : isEdit
            ? "Edit Car Listing"
            : "Create a Listing for New or Used Cars"}
        </h2>
        <p className="text-gray-600 font-medium">
          {isEdit
            ? "Update your vehicle details below"
            : "Complete all sections to list your vehicle"}
        </p>
      </div>

      {loading && !formData.make ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="space-y-8 sm:space-y-12"
        >
          {/*Section 1: For Sale, Rent or Sale Ads */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Object.entries(selectOptions).map(([name, options]) => {
                if (
                  name === "condition" ||
                  name === "status" ||
                  name === "bodyType" ||
                  name === "transmission" ||
                  name === "fuelType"
                )
                  return null;

                return (
                  <div key={name} className="space-y-2">
                    <label
                      htmlFor={name}
                      className="text-sm font-medium text-gray-700"
                    >
                      {name.charAt(0).toUpperCase() +
                        name.slice(1).replace(/([A-Z])/g, " $1")}
                      {options?.[2]?.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all bg-white appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
                    >
                      <option value="">Select {name}</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Basic Information */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-blue-100 p-2 rounded-lg mr-3 sm:mr-4">
                <FaInfoCircle size={20} className="text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {inputFields.map(({ name, label, type, icon, required }) => (
                <div key={name} className="space-y-2">
                  <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                  >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"></div>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required={required}
                      min={type === "number" ? "0" : undefined}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Specifications */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-blue-100 p-2 rounded-lg mr-3 sm:mr-4">
                <FaListAlt size={20} className="text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Specifications
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Object.entries(selectOptions).map(([name, options]) => {
                if (name === "listingType") return null;
                return (
                  <div key={name} className="space-y-2">
                    <label
                      htmlFor={name}
                      className="text-sm font-medium text-gray-700"
                    >
                      {name.charAt(0).toUpperCase() +
                        name.slice(1).replace(/([A-Z])/g, " $1")}
                    </label>
                    <select
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
                    >
                      <option value="">Select {name}</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Features & Description */}

          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-blue-100 p-2 rounded-lg mr-3 sm:mr-4">
                <FaCheckCircle size={20} className="text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Features & Description
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="features"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Features (comma separated)
                </label>
                <input
                  id="features"
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="e.g., Sunroof, Leather Seats, Navigation, Heated Seats"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                />
                <p className="mt-1 text-sm text-gray-500">
                  List the key features of your vehicle
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {match ? (
                    <div className="text-red-600">
                      Enter your Name, Contact Details, Location with{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                  placeholder="Provide detailed information about the car's condition, history, maintenance records, modifications, and any special features..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  The more details you provide, the better your listing will
                  perform
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Images */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-blue-100 p-2 rounded-lg mr-3 sm:mr-4">
                <FaImage size={20} className="text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Vehicle Images
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload high-quality photos of your vehicle (5 maximum allowed)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {existingImages.map((src, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={typeof src === "string" ? src : src.url}
                        alt={`existing-${index}`}
                        className="object-cover w-full h-full group-hover:opacity-75 transition-opacity"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, true)}
                      className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow hover:scale-105"
                    >
                      X
                    </button>
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
                      Existing
                    </div>
                  </div>
                ))}

                {imagePreviews.map((src, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-green-400">
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="object-cover w-full h-full group-hover:opacity-75 transition-opacity"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, false)}
                      className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow hover:scale-105"
                    >
                      X
                    </button>
                  </div>
                ))}

                {existingImages.length + imagePreviews.length < 5 && (
                  <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 transition-colors cursor-pointer bg-gray-50/50">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      Add Images
                    </span>
                    <span className="text-xxs sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                      (Max {5 - (existingImages.length + imagePreviews.length)}{" "}
                      remaining)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-red-500 font-semibold">
                {isEdit
                  ? "Review all changes before submitting"
                  : "Review all information before submitting your listing"}
              </p>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all bg-red-600 hover:bg-red-700 text-white shadow hover:shadow-md active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-bold transition-all ${
                    loading ? "bg-green-600" : "bg-green-600 hover:bg-green-700"
                  } text-white shadow hover:shadow-md active:scale-[0.98] min-w-[120px] sm:min-w-[200px]`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      {isEdit ? "Updating..." : "Creating..."}
                    </span>
                  ) : isEdit ? (
                    "Update Listing"
                  ) : (
                    "Publish Listing"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default CarForm;
