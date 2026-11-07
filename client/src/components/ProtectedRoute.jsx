import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, token, isContextReady } = useContext(ShopContext);

  if (!isContextReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
