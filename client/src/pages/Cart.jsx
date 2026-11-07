import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";



 
const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    cartItems,
    currency,
    delivery_fee,
    token,
    removeFromCart,
    updateCart,
  } = useContext(ShopContext);
   
 
  const [selectedItems, setSelectedItems] = useState({});

  // 🧠 Convert cart object → product array
  const cartProducts = products.filter((p) => cartItems[p._id]);


  // ✅ Toggle item selection
  const toggleSelect = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ➕ Increase quantity
  const increaseQty = (id) => {
    updateCart(id, cartItems[id] + 1);
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    if (cartItems[id] > 1) {
      updateCart(id, cartItems[id] - 1);
    } else {
      removeFromCart(id);
    }
  };

  // ❌ Remove item
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  // 💰 Calculate total of selected items
  const subtotal = cartProducts.reduce((acc, item) => {
    if (selectedItems[item._id]) {
      return acc + item.price * cartItems[item._id];
    }
    return acc;
  }, 0);

  const total =
    subtotal > 0 ? subtotal + delivery_fee : 0;

  const handleCheckout = () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }
    if (Object.keys(selectedItems).length === 0) {
      toast.error("Please select items to checkout");
      return;
    }
    navigate("/place-order", { state: { selectedItems, subtotal, total } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT — Cart Items */}
        <div className="flex-1 space-y-6">

          {cartProducts.length === 0 && (
            <p className="text-gray-500">
              Your cart is empty
            </p>
          )}

          {cartProducts.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 border rounded-lg p-5 shadow-sm bg-white"
            >

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={!!selectedItems[item._id]}
                onChange={() => toggleSelect(item._id)}
                className="mt-2 w-5 h-5"
              />

              {/* Image */}
              <img
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                className="w-32 h-32 object-cover rounded"
                alt={item.name}
              />

              {/* Details */}
              <div className="flex flex-col justify-between flex-1">

                <div>
                  <h2 className="text-lg font-medium">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.category} • {item.subCategory}
                  </p>

                  <p className="mt-2 font-semibold text-lg">
                    {currency}{item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">

                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>

                  <span>{cartItems[item._id]}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-6 text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>

              </div>

              {/* Item Total */}
              <div className="text-lg font-semibold">
                {currency}
                {item.price * cartItems[item._id]}
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT — Order Summary */}
        <div className="w-full lg:w-80 border rounded-lg p-6 shadow-sm bg-white h-fit">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{currency}{subtotal ? delivery_fee : 0}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{currency}{total}</span>
            </div>

          </div>

          <button
            onClick={handleCheckout}
            disabled={!subtotal}
            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-40"
          >
            Proceed to Checkout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Cart;
