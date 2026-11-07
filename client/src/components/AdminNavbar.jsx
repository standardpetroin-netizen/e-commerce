import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { IoClose, IoMenu } from "react-icons/io5";
import logo from "../assets/logo.png";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  // Only show admin nav if user is admin
  const adminNavItems = user?.role === "admin"
    ? [
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Products", path: "/admin/products" },
        { label: "Orders", path: "/admin/orders" },
        { label: "Users", path: "/admin/users" },
      ]
    : [];

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 to-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/admin/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} className="w-28 md:w-32" alt="Logo" />
            <span className="hidden sm:inline text-sm font-bold bg-red-600 px-2 py-1 rounded">
              ADMIN
            </span>
          </Link>

          {/* CENTER - DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {adminNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-white border-b-2 border-red-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT - PROFILE & MOBILE MENU */}
          <div className="flex items-center gap-4">
            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <Link
                    to="/myProfile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    View Store
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors border-t"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded transition-colors"
            >
              {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-700 pt-4">
            {adminNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded transition-colors ${
                  isActive(item.path)
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
