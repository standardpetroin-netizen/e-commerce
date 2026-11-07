import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, API_URL, addToCart } = useContext(ShopContext);

  // Fetch orders
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/order/user-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, API_URL, navigate]);

  // Re-purchase handler
  const handleRepurchase = (items) => {
    items.forEach((item) => {
      addToCart(item.productId, item.quantity);
    });
    toast.success("Items added to cart!");
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No orders yet.</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 mb-6 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex justify-between mb-3">
              <div>
                <p className="font-semibold">Order ID:</p>
                <p className="text-gray-500">{order._id}</p>
              </div>

              <div className="text-center">
                <p className="font-semibold">Status:</p>
                <p className="text-green-600">{order.status || "Processing"}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">Payment:</p>
                <p className="text-gray-600">
                  {order.paymentMethod === "cash_on_delivery" 
                    ? "💵 COD" 
                    : "📱 UPI"}
                </p>
              </div>
            </div>

            {/* Order Items */}
            {order.items && order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-t py-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-gray-500">
                  Ordered on:{" "}
                  {new Date(order.createdAt || order.date).toLocaleDateString()}
                </p>
                <p className="font-bold text-lg">
                  Total: ₹{order.amount}
                </p>
              </div>

              <button
                onClick={() => handleRepurchase(order.items)}
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
              >
                Re-Purchase
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
