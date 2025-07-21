import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

const DetailCard = ({
  header_rows = "grid-cols-8",
  data_rows = "md:grid-cols-8",
  title = "Management",
  subtitle = "Manage data",
  totalCarTitles = "Total",
  addButtonLabel = "Add",
  addButtonLink = "",
  onAddClick = () => {},
  headers = [],
  fieldKeys = [],
  data = [],
  iconStyle1 = "",
  iconStyle2 = "",
  handleDelete = () => {},
  editLinkBase = "",
  handleEdit = () => {},
  imageKey = null,
  imageAltKey = null,
  searchComponent = null,
  customRender = null,
}) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowConfirmModal(true);
  };

  const executeDelete = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete);
    }
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  const defaultRender = (item, key) => {
    if (!item) return "-";

    // Image rendering
    if (key === imageKey && item[key]) {
      const imageSrc = Array.isArray(item[key])
        ? item[key][0]?.url
        : item[key]?.url || item[key];

      return (
        <img
          src={imageSrc}
          alt={item[imageAltKey] || "Image"}
          className="w-12 h-12 object-cover rounded"
        />
      );
    }

    // Multiple fields (array)
    if (Array.isArray(key)) {
      return key
        .map((k) => {
          if (k === "mileage" && typeof item[k] === "number") {
            return `${item[k].toLocaleString()} MPG`;
          }
          if (
            (k === "seats" || k === "seatingCapacity") &&
            typeof item[k] === "number"
          ) {
            return `${item[k].toLocaleString()} Seats`;
          }
          return item[k] ?? "-";
        })
        .filter(Boolean)
        .join(", ");
    }

    // Special field formatting
    if (key === "price" && typeof item[key] === "number") {
      return `Rs. ${item[key].toLocaleString()}/-`;
    }

    if (key === "listingType") {
      const type = item[key];
      const labelMap = {
        sale: { text: "Sale", color: "bg-green-100 text-green-700" },
        rent: { text: "Rent", color: "bg-blue-100 text-blue-700" },
        offer: { text: "Offer", color: "bg-yellow-100 text-yellow-700" },
        ads: { text: "Ad", color: "bg-red-100 text-red-700" },
      };
      const label = labelMap[type];
      return (
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${
            label?.color || "bg-gray-100 text-gray-700"
          }`}
        >
          {label?.text || type}
        </span>
      );
    }

    return item[key] ?? "-";
  };

  const handleAddNavigation = () => {
    onAddClick();
    if (addButtonLink) navigate(addButtonLink);
  };

  const handleEditNavigation = (item) => {
    handleEdit(item);
    if (editLinkBase) {
      navigate(`${editLinkBase}/${item._id}/edit`);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-base text-gray-500">{subtitle}</p>
        </div>
        {addButtonLabel && (
          <button
            onClick={handleAddNavigation}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-lg font-medium"
          >
            {addButtonLabel}
          </button>
        )}
      </div>

      {/* Count */}
      <div className="flex items-center gap-3 text-lg">
        <span className="bg-green-600 py-1.5 px-3 text-white rounded-lg font-semibold">
          {totalCarTitles}
        </span>
        <span className="bg-green-600 py-1.5 px-3 text-white rounded-lg font-semibold">
          {data?.length || 0}
        </span>
      </div>

      {/* Search */}
      {searchComponent && <div>{searchComponent}</div>}

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto">
        {/* Header Row */}
        <div
          className={`hidden md:grid ${header_rows} gap-6 px-6 py-4 bg-green-600 text-white font-semibold text-base`}
        >
          {headers.map((header, idx) => (
            <div key={idx} className="col-span-1">
              {header}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 ${data_rows} gap-6 px-6 py-6 border-t items-center text-base`}
            >
              {fieldKeys.map((key, i) => (
                <div key={i} className="col-span-1 break-words space-y-1">
                  {customRender
                    ? customRender(item, key) ?? defaultRender(item, key)
                    : defaultRender(item, key)}
                </div>
              ))}

              {/* Actions */}
              <div className="flex justify-start md:justify-start gap-3 col-span-1">
                <button
                  onClick={() => handleEditNavigation(item)}
                  className={iconStyle1}
                  title="Edit"
                >
                  <FiEdit className="text-lg" />
                </button>
                <button
                  onClick={() => confirmDelete(item._id)}
                  className={iconStyle2}
                  title="Delete"
                >
                  <FiTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500 text-lg">
            No data found.
          </p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this item?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={executeDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCard;
