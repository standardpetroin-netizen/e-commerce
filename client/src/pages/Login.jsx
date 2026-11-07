import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import API_URL from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(ShopContext);
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle state

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/user/login`, data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        setToken(res.data.token);
        setUser(res.data.user);

        toast.success("Login successful 🎉");

        // Redirect admin to admin dashboard, user to home
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
        err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded"
        />

        {/* Password with toggle */}
        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />

          {/* Toggle Button */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Login
        </button>

        {message && (
          <p className="text-red-500 mt-4 text-center">{message}</p>
        )}

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
