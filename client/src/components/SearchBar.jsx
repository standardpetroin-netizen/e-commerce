import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import search_icon from "../assets/search_icon.png";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  if (!showSearch) return null;

  return (
    <div className="w-full bg-gray-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center border border-gray-300 rounded-full px-5 py-2 bg-white">
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm"
            autoFocus
          />

          {/* Search Icon */}
          <img
            src={search_icon}
            alt="Search"
            className="w-4 h-4 mr-3"
          />

          {/* Cross Button */}
          <button
            onClick={() => setShowSearch(false)}
            className="text-gray-400 hover:text-gray-700 font-bold text-lg focus:outline-none"
            title="Close search"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
