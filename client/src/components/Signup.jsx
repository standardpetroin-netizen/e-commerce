import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import API_URL from "../config/api";

const Signup = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(ShopContext);
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/user/register`, data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        setToken(res.data.token);
        setUser(res.data.user);

        toast.success("Account created successfully 🎉");

        // Redirect admin to dashboard, user to home
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setMessage(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      setMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join us and start your journey today
        </p>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition"
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Sign up as:</p>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={data.role === "user"}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 accent-black"
              />
              <span className="ml-2 text-gray-700">User</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={data.role === "admin"}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 accent-black"
              />
              <span className="ml-2 text-gray-700">Admin (Seller)</span>
            </label>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
          Sign Up
        </button>

        {message && (
          <p className="text-red-500 mt-4 text-center">{message}</p>
        )}

        {/* Redirect */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
