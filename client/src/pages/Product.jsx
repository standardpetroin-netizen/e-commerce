import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import api from "../config/axiosconfig";
import { toast } from "react-toastify";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream:    #F5F1EB;
    --stone:    #EFE8DF;
    --linen:    #E6DED4;
    --mink:     #8B6F63;
    --espresso: #3E2F25;
    --brown:    #5C4033;
    --brown-lt: #C6A27E;
    --white:    #FFFFFF;
    --ink:      #2C1F1A;
  }

  .pd-root *, .pd-root *::before, .pd-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pd-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--espresso);
    min-height: 100vh;
    padding: 48px 0 80px;
  }

  /* ── BREADCRUMB ── */
  .pd-breadcrumb {
    max-width: 1300px;
    margin: 0 auto 40px;
    padding: 0 48px;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mink);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pd-breadcrumb span { opacity: 0.5; }

  /* ── MAIN LAYOUT ── */
  .pd-layout {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 48px;
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    gap: 32px;
    align-items: start;
  }
  @media (max-width: 1024px) {
    .pd-layout { grid-template-columns: 60px 1fr; padding: 0 24px; }
    .pd-info { grid-column: 1 / -1; }
  }
  @media (max-width: 640px) {
    .pd-layout { grid-template-columns: 1fr; gap: 0; padding: 0 16px; }
    .pd-thumbs { display: flex; flex-direction: row; gap: 8px; margin-bottom: 16px; }
    .pd-thumb { width: 56px !important; height: 56px !important; }
    .pd-main-img-wrap { margin-bottom: 24px; }
  }

  /* ── THUMBNAILS ── */
  .pd-thumbs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: sticky;
    top: 24px;
  }
  .pd-thumb {
    width: 72px;
    height: 90px;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid transparent;
    transition: border-color 0.2s, opacity 0.2s;
    opacity: 0.65;
    display: block;
  }
  .pd-thumb:hover { opacity: 1; }
  .pd-thumb.active { border-color: var(--brown); opacity: 1; }

  /* ── MAIN IMAGE ── */
  .pd-main-img-wrap {
    position: relative;
    overflow: hidden;
    background: var(--stone);
    aspect-ratio: 3/4;
    position: sticky;
    top: 24px;
  }
  .pd-main-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .pd-main-img-wrap:hover .pd-main-img { transform: scale(1.03); }

  /* zoom hint */
  .pd-zoom-hint {
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--white);
    background: rgba(62,47,37,0.6);
    padding: 6px 12px;
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .pd-main-img-wrap:hover .pd-zoom-hint { opacity: 1; }

  /* category badge */
  .pd-img-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: rgba(255,255,255,0.88);
    color: var(--espresso);
    padding: 5px 12px;
    backdrop-filter: blur(4px);
    font-weight: 500;
  }

  /* ── INFO PANEL ── */
  .pd-info {
    padding: 4px 0 0 16px;
  }
  @media (max-width: 1024px) { .pd-info { padding: 24px 0 0; } }

  .pd-eyebrow {
    font-size: 10px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--brown-lt);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pd-eyebrow::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--linen);
    max-width: 48px;
  }

  .pd-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .pd-price-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 28px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--linen);
  }
  .pd-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 400;
    color: var(--ink);
  }
  .pd-price-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mink);
  }

  /* ── DESCRIPTION ── */
  .pd-desc {
    font-size: 14px;
    line-height: 1.8;
    color: var(--mink);
    margin-bottom: 32px;
  }

  /* ── QUANTITY ── */
  .pd-section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mink);
    margin-bottom: 12px;
    display: block;
  }

  .pd-qty-wrap {
    display: flex;
    align-items: center;
    border: 1px solid var(--linen);
    width: fit-content;
    margin-bottom: 32px;
    background: var(--white);
  }
  .pd-qty-btn {
    width: 44px;
    height: 44px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--espresso);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .pd-qty-btn:hover { background: var(--stone); }
  .pd-qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .pd-qty-val {
    width: 52px;
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    border-left: 1px solid var(--linen);
    border-right: 1px solid var(--linen);
    height: 44px;
    line-height: 44px;
    color: var(--ink);
  }

  /* ── ACTIONS ── */
  .pd-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 36px;
  }

  .pd-add-btn {
    flex: 1;
    padding: 16px 24px;
    background: var(--espresso);
    color: var(--white);
    border: 1px solid var(--espresso);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s, color 0.25s;
    font-family: 'DM Sans', sans-serif;
  }
  .pd-add-btn:hover { background: var(--brown); border-color: var(--brown); }

  .pd-wish-btn {
    width: 56px;
    height: 56px;
    border: 1px solid var(--linen);
    background: var(--white);
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
    color: var(--mink);
  }
  .pd-wish-btn:hover { border-color: var(--brown); }
  .pd-wish-btn.wishlisted { background: #FEE2E2; border-color: #FCA5A5; color: #DC2626; }

  /* ── META GRID ── */
  .pd-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--linen);
    border: 1px solid var(--linen);
    margin-bottom: 32px;
  }
  .pd-meta-cell {
    background: var(--white);
    padding: 16px 18px;
  }
  .pd-meta-key {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-lt);
    margin-bottom: 4px;
  }
  .pd-meta-val {
    font-size: 13px;
    color: var(--ink);
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  /* ── ACCORDION DETAILS ── */
  .pd-accordion {
    border-top: 1px solid var(--linen);
  }
  .pd-accordion-item { border-bottom: 1px solid var(--linen); }
  .pd-accordion-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--espresso);
    font-family: 'DM Sans', sans-serif;
    text-align: left;
  }
  .pd-accordion-icon {
    font-size: 18px;
    color: var(--mink);
    transition: transform 0.3s;
    line-height: 1;
  }
  .pd-accordion-icon.open { transform: rotate(45deg); }
  .pd-accordion-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.35s ease;
  }
  .pd-accordion-body.open { max-height: 300px; }
  .pd-accordion-content {
    padding: 0 0 20px;
    font-size: 13px;
    line-height: 1.8;
    color: var(--mink);
  }

  /* ── LOADING ── */
  .pd-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    gap: 20px;
    background: var(--cream);
  }
  .pd-spinner {
    width: 40px; height: 40px;
    border: 1.5px solid var(--linen);
    border-top-color: var(--espresso);
    border-radius: 50%;
    animation: pd-spin 0.9s linear infinite;
  }
  @keyframes pd-spin { to { transform: rotate(360deg); } }
  .pd-loading-text {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mink);
  }

  /* entrance */
  .pd-fade-in {
    animation: pd-fadein 0.5s ease both;
  }
  @keyframes pd-fadein {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const ACCORDION_ITEMS = [
  {
    key: "care",
    label: "Care Instructions",
    content:
      "Dry clean or hand wash in cold water. Do not bleach. Lay flat to dry. Iron on low heat if needed. Store folded in a cool, dry place away from direct sunlight.",
  },
  {
    key: "delivery",
    label: "Delivery & Returns",
    content:
      "Free standard delivery on all orders above ₹999. Express delivery available at checkout. Returns accepted within 14 days of delivery in original, unworn condition with all tags attached.",
  },
  {
    key: "craft",
    label: "Craftsmanship",
    content:
      "Each piece is crafted with care using ethically sourced fabrics. Our quality control team reviews every garment before dispatch to ensure it meets our premium standards.",
  },
];

const Product = () => {
  const { id } = useParams();
  const { products, addToCart, currency, API_URL, token, wishlist, addToWishlist, removeFromWishlist } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  const images = productData
    ? Array.isArray(productData.image)
      ? productData.image
      : [productData.image]
    : [];

  useEffect(() => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    } else {
      fetchProduct();
    }
  }, [id, products]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/single/${id}`);
      if (response.data.success) {
        setProductData(response.data.product);
        setImage(
          Array.isArray(response.data.product.image)
            ? response.data.product.image[0]
            : response.data.product.image
        );
      }
    } catch (error) {
      toast.error("Product not found");
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = () => {
    if (!token) { toast.error("Please login first"); return; }
    addToCart(id, quantity);
    toast.success("Added to cart!");
  };

  const handleWishlistToggle = () => {
    if (!token) { toast.error("Please login first"); return; }
    if (isWishlisted) {
      removeFromWishlist(id);
      toast.success("Removed from wishlist!");
    } else {
      addToWishlist(id);
      toast.success("Added to wishlist!");
    }
  };

  const isWishlisted = wishlist && wishlist.some((item) => item._id === id);

  if (!productData) {
    return (
      <div className="pd-root">
        <style>{STYLES}</style>
        <div className="pd-loading">
          <div className="pd-spinner" />
          <span className="pd-loading-text">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-root">
      <style>{STYLES}</style>

      {/* BREADCRUMB */}
      <div className="pd-breadcrumb">
        Home <span>/</span> Collection <span>/</span> {productData.category} <span>/</span> {productData.name}
      </div>

      {/* MAIN GRID */}
      <div className="pd-layout pd-fade-in">

        {/* THUMBNAILS */}
        <div className="pd-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`View ${i + 1}`}
              className={`pd-thumb ${image === img ? "active" : ""}`}
              onClick={() => setImage(img)}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="pd-main-img-wrap">
          {productData.category && (
            <span className="pd-img-badge">{productData.subCategory || productData.category}</span>
          )}
          <img src={image} alt={productData.name} className="pd-main-img" />
          <span className="pd-zoom-hint">Hover to zoom</span>
        </div>

        {/* INFO */}
        <div className="pd-info">
          <p className="pd-eyebrow">{productData.category}</p>
          <h1 className="pd-name">{productData.name}</h1>

          {/* Price */}
          <div className="pd-price-row">
            <span className="pd-price">{currency}{productData.price?.toLocaleString("en-IN")}</span>
            <span className="pd-price-label">Incl. all taxes</span>
          </div>

          {/* Description */}
          <p className="pd-desc">{productData.description}</p>

          {/* Quantity */}
          <span className="pd-section-label">Quantity</span>
          <div className="pd-qty-wrap">
            <button
              className="pd-qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >−</button>
            <span className="pd-qty-val">{quantity}</span>
            <button
              className="pd-qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
            >+</button>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <button className="pd-add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`pd-wish-btn ${isWishlisted ? "wishlisted" : ""}`}
              onClick={handleWishlistToggle}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? "♥" : "♡"}
            </button>
          </div>

          {/* Meta grid */}
          <div className="pd-meta">
            {[
              { k: "Category", v: productData.category || "—" },
              { k: "Style", v: productData.subCategory || "—" },
              { k: "SKU", v: productData._id?.slice(-8).toUpperCase() },
              { k: "Availability", v: "In Stock" },
            ].map(({ k, v }) => (
              <div key={k} className="pd-meta-cell">
                <p className="pd-meta-key">{k}</p>
                <p className="pd-meta-val">{v}</p>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className="pd-accordion">
            {ACCORDION_ITEMS.map((item) => {
              const isOpen = openAccordion === item.key;
              return (
                <div key={item.key} className="pd-accordion-item">
                  <button
                    className="pd-accordion-btn"
                    onClick={() => setOpenAccordion(isOpen ? null : item.key)}
                  >
                    {item.label}
                    <span className={`pd-accordion-icon ${isOpen ? "open" : ""}`}>+</span>
                  </button>
                  <div className={`pd-accordion-body ${isOpen ? "open" : ""}`}>
                    <p className="pd-accordion-content">{item.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;