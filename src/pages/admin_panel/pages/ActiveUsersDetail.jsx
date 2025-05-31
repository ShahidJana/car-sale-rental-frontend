import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import { SearchBar } from "../../../components/common/SearchBar";
import DetailCard from "../../../components/common/DetailCard";
const API_URL = "http://localhost:8080/api";

export default function UsersDetail() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const iconStyle1 =
    "flex items-center bg-transparent p-2 text-green-600 hover:rounded-md hover:bg-green-700 hover:text-white font-medium";
  const iconStyle2 =
    "flex items-center p-2 text-red-600 hover:bg-red-600 hover:rounded-md hover:text-white font-bold";

  // Fetch users
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

  // Filter users by search term
  useEffect(() => {
    const filtered = users.filter((user) =>
      [user.name, user.email, user.role].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Handle deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/user_auth/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      handleSuccess(response.data.message);
    } catch (err) {
      handleError(err.message);
    }
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

    if (key === "email") return <div className="">{user.email}</div>;
    if (key === "role") return user.role;
    if (key === "cnic") return user.cnic || "N/A";
    if (key === "phone") return user.phone || "N/A";
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <DetailCard
        header_rows="grid-cols-6"
        data_rows="md:grid-cols-6"
        columns="6"
        title="Active Users"
        subtitle="List of currently active users"
        totalCarTitles="Active Users"
        addButtonLabel="Add User"
        addButtonLink="/users/new"
        headers={["Name", "Email", "Role", "CNIC", "Phone No", "Action"]}
        fieldKeys={["name", "email", "role", "cnic", "phone"]}
        data={filteredUsers}
        customRender={customRender}
        iconStyle1={iconStyle1}
        iconStyle2={iconStyle2}
        handleDelete={handleDelete}
        editLinkBase="/admin-dashboard/active-users"
        searchComponent={
          <SearchBar
             searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by name, email or role"
          />
        }
      />

      <ToastContainer />
    </div>
  );
}
