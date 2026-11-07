import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminAddProduct from "../components/AdminAddProducts";
import {
  FiTrash2,
  FiImage,
  FiSearch,
  FiPlus,
  FiPackage,
  FiTrendingUp,
  FiGrid,
  FiDollarSign,
} from "react-icons/fi";
import API_URL from "../config/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/product/list`);
      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        toast.error(res.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    try {
      const res = await axios.post(
        `${API_URL}/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Product deleted");
        fetchProducts();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Delete failed");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalValue = products.reduce(
    (sum, p) => sum + (parseFloat(p.price) || 0),
    0
  );

  return (
    <div className="space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">
            Monitor and manage your store in real time
          </p>
        </div>

        <button
          onClick={() => setActiveTab("add")}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          icon={<FiPackage />}
          label="Total Products"
          value={products.length}
        />

        <StatCard
          icon={<FiDollarSign />}
          label="Total Inventory Value"
          value={`₹${totalValue.toLocaleString()}`}
        />

        <StatCard
          icon={<FiTrendingUp />}
          label="Bestsellers"
          value={products.filter((p) => p.bestseller).length}
        />

        <StatCard
          icon={<FiGrid />}
          label="Categories"
          value={[...new Set(products.map((p) => p.category))].length}
        />
      </div>

      {/* ===== SEARCH + CONTROLS ===== */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "list"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Product List
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "add"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* ===== PRODUCT LIST ===== */}
      {activeTab === "list" && (
        <>
          {loading ? (
            <p className="text-center text-gray-500 py-20">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No matching products
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition overflow-hidden group"
                >
                  {/* IMAGE */}
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {product.image?.[0] ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <FiImage size={40} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg truncate">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.category}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">
                        ₹{parseFloat(product.price).toLocaleString()}
                      </span>

                      {product.bestseller && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* ACTION */}
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="w-full mt-3 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== ADD PRODUCT ===== */}
      {activeTab === "add" && (
        <div className="bg-white p-6 rounded-2xl shadow border">
          <AdminAddProduct />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
    <div className="p-3 bg-black text-white rounded-lg text-xl">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;
