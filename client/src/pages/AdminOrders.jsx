import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiFilter, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import API_URL from "../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_URL}/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) setOrders(res.data.orders || []);
      else setError(res.data.message || "Failed to load orders");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to load orders";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${API_URL}/order/update`,
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order updated");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const icon = (status) => {
    switch (status) {
      case "Delivered":
        return <FiCheckCircle className="text-emerald-600" />;
      case "Processing":
        return <FiClock className="text-blue-600" />;
      case "Cancelled":
        return <FiXCircle className="text-red-600" />;
      default:
        return <FiClock className="text-amber-600" />;
    }
  };

  const badge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700";
      case "Processing":
        return "bg-blue-50 text-blue-700";
      case "Cancelled":
        return "bg-red-50 text-red-700";
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  /* LOADING */
  if (loading)
    return (
      <div className="flex justify-center items-center h-96 bg-[#F5F3EF]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#C76B50] rounded-full animate-spin" />
      </div>
    );

  /* ERROR */
  if (error)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="bg-[#F5F3EF] min-h-screen p-6 md:p-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-light text-gray-900">
          Order <span className="text-[#C76B50] italic">Management</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Track, process and manage customer orders
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border border-[#E4E0DA] rounded-xl p-4 flex flex-wrap gap-3 items-center shadow-sm">
        <FiFilter className="text-gray-600" />

        {["all", "Pending", "Processing", "Delivered", "Cancelled"].map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                filterStatus === s
                  ? "bg-[#1F2933] text-white"
                  : "bg-[#F1EFEA] text-gray-700 hover:bg-[#E4E0DA]"
              }`}
            >
              {s}
            </button>
          )
        )}
      </div>

      {/* ORDERS */}
      {filtered.length === 0 ? (
        <div className="bg-white p-14 text-center rounded-xl border border-[#E4E0DA]">
          No orders found
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-[#E4E0DA] rounded-xl shadow-sm overflow-hidden
                         transition hover:shadow-xl"
            >

              {/* ORDER HEADER */}
              <div
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order._id ? null : order._id
                  )
                }
                className="p-5 md:p-6 cursor-pointer hover:bg-[#F9F7F4] transition"
              >
                <div className="grid md:grid-cols-5 gap-4 items-center">

                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-semibold">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="font-medium">
                      {order.userId?.name || "Guest"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.userId?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-semibold">
                      ₹{order.amount?.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {icon(order.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* EXPANDED PANEL */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden
                ${
                  expandedOrder === order._id
                    ? "max-h-[900px]"
                    : "max-h-0"
                }`}
              >
                <div className="p-6 bg-[#F9F7F4] border-t space-y-6">

                  {/* ADDRESS + DETAILS */}
                  <div className="grid md:grid-cols-2 gap-6">

                    <div>
                      <h4 className="font-semibold mb-2">Delivery Address</h4>
                      <p className="text-sm text-gray-700">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.street}
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.city}, {order.state} {order.zipcode}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Order Summary</h4>
                      <p className="text-sm mb-3">
                        <strong>Payment:</strong>{" "}
                        {order.paymentMethod === "cash_on_delivery" 
                          ? "💵 Cash on Delivery" 
                          : "📱 UPI"}
                      </p>
                      <p>Subtotal: ₹{order.amount}</p>
                      <p>Tax (18%): ₹{(order.amount * 0.18).toFixed(2)}</p>
                      <p>Shipping: ₹10</p>
                      <p className="font-semibold mt-2">
                        Total: ₹
                        {(order.amount * 1.18 + 10).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div>
                    <h4 className="font-semibold mb-3">Items</h4>
                    <div className="bg-white rounded-lg border divide-y">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 flex justify-between text-sm"
                        >
                          <span>{item.name}</span>
                          <span className="text-gray-600">
                            {item.quantity} × ₹{item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STATUS UPDATE */}
                  <div>
                    <h4 className="font-semibold mb-3">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Pending",
                        "Processing",
                        "Delivered",
                        "Cancelled",
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() =>
                            updateOrderStatus(order._id, s)
                          }
                          disabled={order.status === s}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition
                          ${
                            order.status === s
                              ? "bg-gray-300 text-gray-600"
                              : "bg-[#1F2933] text-white hover:bg-[#C76B50]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;