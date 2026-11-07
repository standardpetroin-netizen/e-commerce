import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const productsRes = await axios.get(`${API_URL}/product/list`);
      const totalProducts = productsRes.data.products?.length || 0;

      const ordersRes = await axios.get(`${API_URL}/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orders = ordersRes.data.orders || [];
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce(
        (sum, o) => sum + (o.amount || 0),
        0
      );

      const usersRes = await axios.get(`${API_URL}/user/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const totalUsers = usersRes.data.users?.length || 0;

      const recentOrdersList = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({ totalProducts, totalOrders, totalUsers, totalRevenue });
      setRecentOrders(recentOrdersList);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const badgeStyle = (status) => {
    if (status === "Delivered") return "bg-emerald-50 text-emerald-700";
    if (status === "Processing") return "bg-blue-50 text-blue-700";
    if (status === "Cancelled") return "bg-red-50 text-red-700";
    return "bg-amber-50 text-amber-700";
  };

  const statItems = [
    {
      label: "Products",
      value: stats.totalProducts,
      icon: <FiPackage />,
    },
    {
      label: "Orders",
      value: stats.totalOrders,
      icon: <FiShoppingCart />,
    },
    {
      label: "Customers",
      value: stats.totalUsers,
      icon: <FiUsers />,
    },
    {
      label: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      icon: <FiTrendingUp />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4F1]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#C76B50] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4F1] text-gray-900 px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 border-b border-[#E6E2DD] pb-6">
        <div>
          <p className="uppercase tracking-widest text-xs text-gray-500">
            Admin Dashboard
          </p>
          <h1 className="text-5xl font-light">
            Store <span className="text-[#C76B50] italic">Overview</span>
          </h1>
        </div>
        <p className="text-sm text-gray-500 mt-2 md:mt-0">{today}</p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
        {statItems.map((s) => (
          <div
            key={s.label}
            className="bg-white p-6 rounded-xl border border-[#E6E2DD]
                       shadow-sm hover:shadow-xl hover:-translate-y-1
                       transition duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {s.label}
                </p>
                <p className="text-3xl font-light mt-2 group-hover:text-[#C76B50] transition">
                  {s.value}
                </p>
              </div>

              <span className="text-xl text-gray-400 group-hover:text-[#C76B50] transition">
                {s.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {[
          {
            to: "/admin/products",
            title: "Manage Products",
            desc: "Add, edit, or remove items",
          },
          {
            to: "/admin/orders",
            title: "View Orders",
            desc: "Track and update order status",
          },
          {
            to: "/admin/users",
            title: "Manage Users",
            desc: "Administer customer accounts",
          },
        ].map((a, i) => (
          <Link
            key={i}
            to={a.to}
            className="relative bg-white p-8 rounded-xl border border-[#E6E2DD]
                       overflow-hidden shadow-sm transition duration-300
                       hover:-translate-y-2 hover:shadow-2xl group"
          >
            {/* Sliding overlay */}
            <div className="absolute inset-0 bg-[#1F2933] translate-y-full
                            group-hover:translate-y-0 transition-transform duration-500" />

            <div className="relative z-10">
              <h3 className="text-2xl font-medium mb-2 group-hover:text-white transition">
                {a.title}
              </h3>

              <p className="text-gray-500 mb-8 group-hover:text-gray-300 transition">
                {a.desc}
              </p>

              <span className="flex items-center gap-2 text-sm font-semibold text-[#C76B50]
                               group-hover:text-[#D8C3A5] transition">
                Enter <FiArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-xl border border-[#E6E2DD] shadow-sm overflow-hidden">

        <div className="flex justify-between items-center p-6 border-b border-[#E6E2DD]">
          <h2 className="text-2xl font-medium">Recent Orders</h2>

          <Link
            to="/admin/orders"
            className="flex items-center gap-2 text-sm font-semibold text-[#C76B50] hover:text-[#1F2933] transition"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-center py-14 text-gray-500">
            No orders yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F0ECE7] text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-t border-[#E6E2DD] hover:bg-[#F9F7F4] transition"
                  >
                    <td className="p-4 font-medium">
                      #{o._id?.slice(-8).toUpperCase()}
                    </td>

                    <td className="p-4">
                      {o.userId?.name || "—"}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{o.amount?.toLocaleString("en-IN")}
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;