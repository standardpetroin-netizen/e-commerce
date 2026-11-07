import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    setCartItems,
    token,
    API_URL,
  } = useContext(ShopContext);

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Convert cart object → array
  const cartData = products
    .filter((p) => cartItems[p._id])
    .map((p) => ({
      productId: p._id,
      name: p.name,
      price: p.price,
      quantity: cartItems[p._id],
      image: Array.isArray(p.image) ? p.image[0] : p.image,
    }));

  const subtotal = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + delivery_fee;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Validate cart is not empty
    if (cartData.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Validate address
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill all address fields");
      return;
    }

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      console.log("Submitting order with:", { paymentMethod, items: cartData.length, total });

      const response = await axios.post(
        `${API_URL}/order/place`,
        { items: cartData, amount: total, address, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Order placed successfully 🎉");
        
        // Clear cart from local state
        setCartItems({});
        
        // Clear cart items from each item in the backend (best effort)
        try {
          for (const item of cartData) {
            await axios.delete(`${API_URL}/cart/remove/${item.productId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
          }
        } catch (cartClearError) {
          console.log("Couldn't clear cart from backend:", cartClearError);
          // Don't fail the order if cart clearing fails
        }
        
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={placeOrder}>
        
        {/* GRID FIXED HERE */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN — ADDRESS & PAYMENT */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* SHIPPING ADDRESS */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">

              <h2 className="text-xl font-semibold mb-6">
                Shipping Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">

                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  name="street"
                  placeholder="Street Address"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg sm:col-span-2 focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  name="pincode"
                  placeholder="Pincode"
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                />

                <input
                  name="country"
                  value="India"
                  readOnly
                  className="border p-3 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">

              <h2 className="text-xl font-semibold mb-6">
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <div 
                  className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-black transition"
                  style={{ borderColor: paymentMethod === 'cash_on_delivery' ? '#000' : '#e5e7eb' }}
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-lg">💵 Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>

                {/* UPI */}
                <div 
                  className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:border-black transition"
                  style={{ borderColor: paymentMethod === 'upi' ? '#000' : '#e5e7eb' }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-lg">📱 UPI Payment</p>
                    <p className="text-sm text-gray-500">Pay securely using UPI services</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — ORDER SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-6">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-4">
              {cartData.map((item) => (
                <div key={item.productId} className="flex gap-4">

                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {currency}{item.price * item.quantity}
                  </p>

                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{currency}{delivery_fee}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{currency}{total}</span>
              </div>
            </div>

            {/* Payment Method Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Payment Method:</p>
              <p className="font-semibold">
                {paymentMethod === "cash_on_delivery" 
                  ? "💵 Cash on Delivery" 
                  : "📱 UPI Payment"}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>

        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
