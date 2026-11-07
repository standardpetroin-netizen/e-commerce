import React from "react";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer } from "react-toastify";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {children}
      </main>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminLayout;
