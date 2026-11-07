import React from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import AdminLayout from "./components/AdminLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import axios from "axios"

// Pages
import Home from "./pages/Home"
import AdminHome from "./pages/AdminHome"
import MyProfile from "./pages/MyProfile"
import AdminDashboard from "./pages/AdminDashboard"
import AdminOrders from "./pages/AdminOrders"
import AdminUsers from "./pages/AdminUsers"
import Collection from "./pages/Collection"
import Product from "./pages/Product"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import Signup from "./components/Signup"
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./pages/PlaceOrder"

axios.defaults.withCredentials = true;
const App = () => {
  
  return (
    <div>
      {/* Navbar visible on all pages */}
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Page Routes */}
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>

          {/* ==================== USER ROUTES ==================== */}
          
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Collection / Shop */}
          <Route path="/collection" element={<Collection />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<Product />} />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Wishlist */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/> } />

          {/* Place Order */}
          <Route path="/place-order" element={<PlaceOrder/>} />

          {/* User Orders */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/myProfile" element={<MyProfile />} />

        </Routes>
      </div>

      {/* ==================== ADMIN ROUTES (No padding wrapper) ==================== */}
      <Routes>
        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminHome />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Products Management */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Orders Management */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Users Management */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Legacy Routes - Redirect */}
        <Route path="/admin/add-product" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/adminDashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
