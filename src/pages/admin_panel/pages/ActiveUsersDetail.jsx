import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import { SearchBar } from "../../../components/common/SearchBar";
import DetailCard from "../../../components/common/DetailCard";

const API_URL = "http://localhost:8080/api";

export default function UsersDetail() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("list");
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const iconStyle1 =
    "flex items-center bg-transparent p-2 text-green-600 hover:rounded-md hover:bg-green-700 hover:text-white font-medium";
  const iconStyle2 =
    "flex items-center p-2 text-red-600 hover:bg-red-600 hover:rounded-md hover:text-white font-bold";

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/user_auth/getAllUsers`);
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      [user.name, user.email, user.role].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/user_auth/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      handleSuccess(res.data.message);
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setMode("edit");
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
    setMode("add");
  };

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return handleError("Name, Email & Password are required");
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(email)) {
      return handleError("Only @gmail.com addresses are allowed");
    }

    if (password.length < 6) {
      return handleError("Password must be at least 6 digits long");
    }
    try {
      if (formData._id) {
        const { _id, password, ...updateData } = formData;
        const res = await axios.put(`${API_URL}/user_auth/${_id}`, updateData);
        handleSuccess(res.data.message);
      } else {
        const res = await axios.post(`${API_URL}/user_auth/signup`, formData);
        handleSuccess(res.data.message);
      }

      await fetchUsers();
      setMode("list");
    } catch (err) {
      handleError(err.message);
    }
  };

  const closeModal = () => {
    setMode("list");
  };

  const customRender = (user, key) => {
    if (key === "name") {
      return (
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-semibold">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="font-semibold">{user.name}</div>
        </div>
      );
    }
    if (key === "email") return user.email;
    if (key === "role") return user.role;
    if (key === "cnic") return user.cnic || "N/A";
    if (key === "phone") return user.phone || "N/A";
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <DetailCard
        header_rows="grid-cols-4"
        data_rows="md:grid-cols-4"
        columns="4"
        title="Active Users"
        subtitle="List of currently active users"
        totalCarTitles="Active Users"
        addButtonLabel="Add User"
        onAddClick={handleAdd}
        headers={["Name", "Email", "Role", "Action"]}
        fieldKeys={["name", "email", "role"]}
        data={filteredUsers}
        customRender={customRender}
        iconStyle1={iconStyle1}
        iconStyle2={iconStyle2}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editLinkBase="/add"
        searchComponent={
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by name, email or role"
          />
        }
      />

      {(mode === "add" || mode === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 sm:p-6">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Form */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {mode === "add" ? "Add New User" : "Update User"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "email", "password"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block font-medium capitalize mb-1"
                    >
                      {field} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id={field}
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required={field !== "password"}
                      placeholder={`${
                        field === "password"
                          ? "Password must be at least 6 digits long"
                          : `${"Enter your " + field}`
                      }`} // 👈 placeholder here
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ))}
                {/* Role Select */}
                <div>
                  <label
                    htmlFor="role"
                    className="block font-medium capitalize mb-1"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    {mode === "add" ? "Add" : "Update"}
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
