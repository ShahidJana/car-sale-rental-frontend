import React from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="w-full bg-white rounded shadow p-4">
      <div className="flex items-center gap-3 w-full">
        {/* <FiSearch className="text-gray-500" /> */}
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
    </div>
  );
};
