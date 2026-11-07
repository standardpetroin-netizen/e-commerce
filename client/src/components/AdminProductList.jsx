import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get(
      `${API_URL}/product/list`
    );

    setProducts(res.data.products);
  };

  const deleteProduct = async (id) => {
    await axios.post(
      `${API_URL}/product/delete`,
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProducts();
  };

  const toggleProduct = async (id) => {
    await axios.post(
      `${API_URL}/product/toggle`,
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Manage Products
      </h2>

      {products.map((p) => (
        <div
          key={p._id}
          className="flex justify-between items-center border p-4 mb-3 rounded"
        >
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-gray-500">
              ₹{p.price}
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => toggleProduct(p._id)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              {p.available ? "Unlist" : "List"}
            </button>

            <button
              onClick={() => deleteProduct(p._id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductList;
