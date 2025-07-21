import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import { SearchBar } from "../../../components/common/SearchBar";
import DetailCard from "../../../components/common/DetailCard";

const API_URL = "http://localhost:8080/api";

export default function ReviewsModeration() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    comment: "",
    rating: "",
  });

  const iconStyle1 =
    "flex items-center bg-transparent p-2 text-green-600 hover:rounded-md hover:bg-green-700 hover:text-white font-medium";
  const iconStyle2 =
    "flex items-center p-2 text-red-600 hover:bg-red-600 hover:rounded-md hover:text-white font-bold";

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviewratings/`);
      setReviews(res.data.reviews);
      setFilteredReviews(res.data.reviews);
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter((review) =>
      [review.comment, review.rating].some((field) =>
        String(field)?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredReviews(filtered);
  }, [searchTerm, reviews]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/reviewratings/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
      handleSuccess(res.data.message);
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleEdit = (review) => {
    setFormData({
      _id: review._id,
      comment: review.comment,
    });
    setMode("edit");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { comment, _id } = formData;

    setLoading(true);

    try {
      if (_id) {
        const res = await axios.put(`${API_URL}/reviewratings/${_id}`, {
          comment,
        });
        handleSuccess(res.data.message || "Review updated successfully");
      }

      await fetchReviews();
      setMode("list");
    } catch (err) {
      handleError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setMode("list");

  const customRender = (review, key) => {
    if (key === "comment")
      return (
        <span className="line-clamp-2" title={review.comment}>
          {review.comment}
        </span>
      );
    if (key === "rating") return `${review.rating} ★`;
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <DetailCard
        header_rows="grid-cols-3"
        data_rows="md:grid-cols-3"
        columns="3"
        title="Review Moderation"
        subtitle="Manage, approve or delete car reviews"
        totalCarTitles="Total Reviews"
        headers={["Review", "Rating", "Action"]}
        fieldKeys={["comment", "rating"]}
        data={filteredReviews}
        customRender={customRender}
        iconStyle1={iconStyle1}
        iconStyle2={iconStyle2}
        addButtonLabel=""
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        searchComponent={
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search comment or rating"
          />
        }
      />

      {mode === "edit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 sm:p-6">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Update Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["comment"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block font-medium capitalize mb-1"
                    >
                      {field}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      rows={5}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                    />
                  </div>
                ))}

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded text-white transition ${
                      loading
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
