import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

const ProductGrid = ({ products = [] }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          currency={currency}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

/* ================= PRODUCT CARD ================= */

const ProductCard = ({ product, currency }) => {
  const images = Array.isArray(product.image)
    ? product.image
    : [product.image];

  const [activeIndex, setActiveIndex] = useState(0);
  const [wish, setWish] = useState(false);

  const hasMultiple = images.length > 1;

  return (
    <Link
      to={`/product/${product._id || product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 block"
      onMouseEnter={() => hasMultiple && setActiveIndex(1)}
      onMouseLeave={() => setActiveIndex(0)}
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={images[activeIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWish(!wish);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow transition ${
            wish ? "text-red-500" : "text-gray-600"
          }`}
        >
          <FaHeart />
        </button>

        {/* QUICK ADD BUTTON */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-black text-white py-2 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition"
          >
            <FaShoppingBag /> Quick Add
          </button>
        </div>

        {/* IMAGE DOTS (Myntra Style) */}
        {hasMultiple && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
            {images.map((_, i) => (
              <span
                key={i}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setActiveIndex(i);
                }}
                className={`h-1.5 w-4 rounded-full cursor-pointer ${
                  activeIndex === i
                    ? "bg-white"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="p-3">
        <p className="text-sm text-gray-800 truncate">
          {product.name}
        </p>

        <p className="mt-1 font-semibold text-gray-900">
          {currency}
          {product.price}
        </p>
      </div>
    </Link>
  );
};
