import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";

import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.png";
import profile_icon from "../assets/profile_icon.png";
import cart_icon from "../assets/cart_icon.png";
import menu_icon from "../assets/menu_icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowSearch, user, logout, cartItems, wishlist } =
    useContext(ShopContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* ---------- COUNTS ---------- */

  const getCartCount = () =>
    Object.values(cartItems || {}).reduce((a, b) => a + b, 0);

  const getWishlistCount = () => wishlist?.length || 0;

  /* ---------- NAV LINK STYLE ---------- */

  const navLinkStyle = ({ isActive }) =>
    `relative font-semibold tracking-wide transition-all duration-300
     ${
       isActive
         ? "text-[#5A3E2B]"
         : "text-[#6B5E55] hover:text-[#8B5E3C]"
     }
     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:w-0 after:bg-[#8B5E3C] after:transition-all
     hover:after:w-full`;

  return (
    <nav className="w-full bg-[#F5EFE7]/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#E6DED3]">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              className="w-32 md:w-36 hover:scale-105 transition"
              alt="Logo"
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10 text-sm flex-1 justify-center">
            <li><NavLink to="/" className={navLinkStyle}>HOME</NavLink></li>
            <li><NavLink to="/collection" className={navLinkStyle}>COLLECTION</NavLink></li>
            <li><NavLink to="/about" className={navLinkStyle}>ABOUT</NavLink></li>
            <li><NavLink to="/contact" className={navLinkStyle}>CONTACT</NavLink></li>
          </ul>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-[#E8DFD5] transition"
            >
              <img src={search_icon} className="w-5 opacity-80" alt="Search" />
            </button>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 rounded-full hover:bg-[#E8DFD5] transition"
              >
                <img src={profile_icon} className="w-5 opacity-80" alt="Profile" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-xl py-2 text-sm border border-[#E6DED3]">

                  {user ? (
                    <>
                      {/* USER INFO */}
                      <div className="px-4 py-3 border-b bg-[#F5EFE7] rounded-t-xl">
                        <p className="font-semibold text-[#3E2F25]">{user.name}</p>
                        <p className="text-xs text-[#8B7B6C]">{user.email}</p>
                      </div>

                      {/* ADMIN LINKS */}
                      {user.role === "admin" && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-[#F5EFE7] font-bold text-[#C76B50]"
                          >
                            Admin Dashboard
                          </Link>
                          <Link
                            to="/admin/products"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-[#F5EFE7]"
                          >
                            Manage Products
                          </Link>
                          <Link
                            to="/admin/orders"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-[#F5EFE7]"
                          >
                            Manage Orders
                          </Link>
                          <Link
                            to="/admin/users"
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-[#F5EFE7]"
                          >
                            Manage Users
                          </Link>
                          <div className="border-t my-1" />
                        </>
                      )}

                      {/* USER LINKS */}
                      <Link
                        to="/myProfile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F5EFE7]"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F5EFE7]"
                      >
                        Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F5EFE7]"
                      >
                        Wishlist ({getWishlistCount()})
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F5EFE7] border-t text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-[#F5EFE7]"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* CART */}
            <Link to="/cart" className="relative">
              <img src={cart_icon} className="w-6 opacity-90" alt="Cart" />

              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#8B5E3C] text-white text-xs px-2 py-[2px] rounded-full font-bold shadow">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative text-xl text-[#6B5E55] hover:text-[#8B5E3C] transition">
              ♡
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#A47551] text-white text-xs px-2 py-[2px] rounded-full font-bold">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-[#E8DFD5] transition"
            >
              <img src={menu_icon} className="w-6" alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 h-full w-72 bg-[#F5EFE7] shadow-2xl z-50 animate-slideIn">

            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="font-semibold text-[#3E2F25]">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <IoClose size={22} />
              </button>
            </div>

            <ul className="flex flex-col text-sm">
              {["/", "/collection", "/wishlist", "/about", "/contact"].map(
                (path, i) => (
                  <li key={i}>
                    <NavLink
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className="block px-6 py-4 border-b border-[#E6DED3] text-[#5A4A3B] hover:bg-[#E8DFD5]"
                    >
                      {path === "/"
                        ? "HOME"
                        : path.replace("/", "").toUpperCase()}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;