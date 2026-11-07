import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency, wishlist, addToWishlist, removeFromWishlist, token } = useContext(ShopContext);

  const images = Array.isArray(image) ? image : [image];
  const hasMultiple = images.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);

  const isWishlisted = wishlist.some((item) => item._id === id);

  const handleMouseEnter = () => {
    if (hasMultiple) setActiveIndex(1); // show 2nd image on hover
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);
  };

  const handleDotHover = (index) => {
    setActiveIndex(index);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      alert("Please login to add items to wishlist");
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <div className="product-item text-gray-700">
      <style>{`
        .product-item {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          position: relative;
          display: block;
        }

        .product-link {
          text-decoration: none;
          display: block;
          color: inherit;
        }

        .product-img-wrapper {
          position: relative;
          overflow: hidden;
          background: #f7f5f2;
          aspect-ratio: 3/4;
        }

        .product-img,
        .product-img-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.35s ease, transform 0.5s ease;
        }

        .product-img-overlay {
          opacity: 0;
          transform: scale(1.05);
        }

        .product-img-overlay.active {
          opacity: 1;
          transform: scale(1);
        }

        .product-item:hover .product-img {
          transform: scale(1.06);
        }

        /* Dot strip */
        .image-dots {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          gap: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-item:hover .image-dots {
          opacity: 1;
        }

        .image-dot {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .image-dot.active {
          background: rgba(255,255,255,0.95);
        }

        /* Quick tag */
        .quick-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0,0,0,0.75);
          color: #fff;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 8px;
          backdrop-filter: blur(6px);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .product-item:hover .quick-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Bestseller badge */
        .bestseller-badge {
          position: absolute;
          top: 12px;
          right: 50px;
          background: linear-gradient(135deg, #D4AF37, #E8C547);
          color: #1a1a1a;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 5px 10px;
          backdrop-filter: blur(6px);
          opacity: 1;
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
        }

        /* Product info */
        .product-info {
          padding: 12px 0 6px;
        }

        .product-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          color: #1a1a1a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          opacity: 0;
        }

        .product-item:hover .wishlist-btn {
          opacity: 1;
        }

        .wishlist-btn:hover {
          background: #f0f0f0;
          transform: scale(1.1);
        }
      `}</style>

      <Link to={`/product/${id}`} className="product-link">
        <div className="product-img-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Base image */}
          <img
            className="product-img"
            src={images[0]}
            alt={name}
          />

          {/* Overlay images */}
          {hasMultiple &&
            images.slice(1).map((src, i) => (
              <img
                key={i}
                className={`product-img-overlay ${
                  activeIndex === i + 1 ? "active" : ""
                }`}
                src={src}
                alt={`${name} view ${i + 2}`}
              />
            ))}

          {/* Photo count tag */}
          {hasMultiple && (
            <span className="quick-tag">{images.length} photos</span>
          )}

          {/* Bestseller badge */}
          {bestseller && (
            <span className="bestseller-badge">⭐ Bestseller</span>
          )}

          {/* Dot indicators */}
          {hasMultiple && (
            <div className="image-dots">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`image-dot ${
                    activeIndex === i ? "active" : ""
                  }`}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDotHover(i);
                  }}
                />
              ))}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            className="wishlist-btn"
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
      </Link>

      <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }} className="product-link">
        <div className="product-info">
          <p className="product-name">{name}</p>
          <p className="product-price">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
