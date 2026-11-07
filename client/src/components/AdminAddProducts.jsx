import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import API_URL from "../config/api";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: "",
    bestseller: false,
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e, imageField) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setImages({
        ...images,
        [imageField]: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews({
          ...imagePreviews,
          [imageField]: event.target?.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (imageField) => {
    setImages({
      ...images,
      [imageField]: null,
    });
    setImagePreviews({
      ...imagePreviews,
      [imageField]: null,
    });
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login as admin first");
      return;
    }

    // Validate required fields
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.subCategory
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate at least one image
    if (!images.image1) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("sizes", product.sizes);
      formData.append("bestseller", product.bestseller);

      // Add images
      if (images.image1) formData.append("image1", images.image1);
      if (images.image2) formData.append("image2", images.image2);
      if (images.image3) formData.append("image3", images.image3);
      if (images.image4) formData.append("image4", images.image4);

      const response = await axios.post(`${API_URL}/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("Product added successfully! ✅");
        // Reset form
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          subCategory: "",
          sizes: "",
          bestseller: false,
        });
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
        setImagePreviews({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to add product";
      toast.error(errorMsg);
      console.error("Error adding product:", {
        status: error.response?.status,
        message: errorMsg,
        data: error.response?.data,
        fullError: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Add New Product</h1>

        <form onSubmit={submitProduct} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* SubCategory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sub Category *
            </label>
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Sub Category</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sizes (comma-separated: S,M,L,XL)
            </label>
            <input
              type="text"
              name="sizes"
              value={product.sizes}
              onChange={handleChange}
              placeholder="e.g., S,M,L,XL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Best Seller */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="bestseller"
              checked={product.bestseller}
              onChange={handleChange}
              className="w-4 h-4 accent-black rounded"
            />
            <label className="ml-2 text-sm font-semibold text-gray-700">
              Mark as Best Seller
            </label>
          </div>

          {/* Image Upload Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Product Images (Max 4) *
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload high-quality images. First image is required.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((num) => {
                const imageField = `image${num}`;
                return (
                  <div key={imageField} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {imagePreviews[imageField] ? (
                      <div className="relative">
                        <img
                          src={imagePreviews[imageField]}
                          alt={`Preview ${num}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(imageField)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <IoClose size={20} />
                        </button>
                        <p className="text-xs text-gray-600 mt-2 text-center">
                          Image {num}
                        </p>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, imageField)}
                          className="hidden"
                        />
                        <div className="text-center py-8">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-4-12l-8-8m8 8v12m-8 8H8m20 0h12"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-2 text-sm font-medium text-gray-700">
                            Upload Image {num}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 5MB {num === 1 ? "(Required)" : "(Optional)"}
                          </p>
                        </div>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
