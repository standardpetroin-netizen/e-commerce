import React, { useContext, useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import SearchBar from "../components/SearchBar";

/* ─── Inject styles once ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

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

  .col-root *, .col-root *::before, .col-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .col-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--espresso);
    min-height: 100vh;
  }

  /* ── PAGE HEADER ── */
  .col-header {
    text-align: center;
    padding: 72px 24px 56px;
    border-bottom: 1px solid var(--linen);
    background: var(--stone);
    position: relative;
    overflow: hidden;
  }
  .col-header::before {
    content: 'COLLECTION';
    position: absolute;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(80px, 14vw, 180px);
    font-weight: 300;
    color: rgba(62,47,37,0.04);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: 0.05em;
  }
  .col-eyebrow {
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--mink);
    margin-bottom: 12px;
  }
  .col-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 300;
    color: var(--ink);
    line-height: 1;
    margin-bottom: 8px;
  }
  .col-heading em { font-style: italic; color: var(--brown); }
  .col-subheading {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--mink);
  }

  /* ── HORIZONTAL CATEGORY STRIP ── */
  .col-cat-strip {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--white);
    border-bottom: 1px solid var(--linen);
    box-shadow: 0 2px 16px rgba(62,47,37,0.06);
  }
  .col-cat-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .col-cat-inner::-webkit-scrollbar { display: none; }

  .col-cat-btn {
    flex-shrink: 0;
    padding: 18px 28px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--mink);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: color 0.25s, border-color 0.25s;
    white-space: nowrap;
    position: relative;
  }
  .col-cat-btn::after {
    content: attr(data-count);
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 9px;
    color: var(--brown-lt);
    font-weight: 400;
  }
  .col-cat-btn.active {
    color: var(--espresso);
    border-bottom-color: var(--brown);
    font-weight: 600;
  }
  .col-cat-btn:hover { color: var(--espresso); }

  .col-cat-sep {
    width: 1px;
    height: 16px;
    background: var(--linen);
    flex-shrink: 0;
    margin: 0 4px;
  }

  /* ── LAYOUT ── */
  .col-layout {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 32px 80px;
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  /* ── SIDEBAR ── */
  .col-sidebar {
    width: 260px;
    flex-shrink: 0;
    position: sticky;
    top: 70px;
  }
  .col-sidebar-card {
    background: var(--white);
    border: 1px solid var(--linen);
    padding: 32px 28px;
  }
  .col-sidebar-title {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--mink);
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--linen);
  }

  .col-filter-section { margin-bottom: 28px; }
  .col-filter-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-lt);
    margin-bottom: 14px;
    display: block;
  }

  /* Sub-category pills with scroll */
  .col-sub-scroll {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 160px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--linen) transparent;
    padding-right: 4px;
  }
  .col-sub-scroll::-webkit-scrollbar { width: 3px; }
  .col-sub-scroll::-webkit-scrollbar-track { background: transparent; }
  .col-sub-scroll::-webkit-scrollbar-thumb { background: var(--linen); border-radius: 4px; }

  .col-sub-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    font-size: 12px;
    color: var(--mink);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    border-left: 2px solid transparent;
    transition: all 0.2s;
    letter-spacing: 0.04em;
  }
  .col-sub-btn:hover { color: var(--espresso); background: var(--stone); border-left-color: var(--linen); }
  .col-sub-btn.active {
    color: var(--espresso);
    background: var(--stone);
    border-left-color: var(--brown);
    font-weight: 500;
  }
  .col-sub-count {
    font-size: 10px;
    color: var(--brown-lt);
    font-weight: 400;
  }

  /* Price slider */
  .col-price-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--brown) 0%, var(--brown) var(--pct, 100%), var(--linen) var(--pct, 100%));
    outline: none;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .col-price-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--brown);
    cursor: pointer;
    box-shadow: 0 0 0 3px rgba(92,64,51,0.15);
    transition: box-shadow 0.2s;
  }
  .col-price-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 6px rgba(92,64,51,0.15); }
  .col-price-label { font-size: 12px; color: var(--mink); display: flex; justify-content: space-between; }
  .col-price-val { font-family: 'Cormorant Garamond', serif; font-size: 15px; color: var(--espresso); font-weight: 500; }

  /* Reset */
  .col-reset-btn {
    width: 100%;
    padding: 12px;
    background: none;
    border: 1px solid var(--espresso);
    color: var(--espresso);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s, color 0.25s;
    margin-top: 8px;
  }
  .col-reset-btn:hover { background: var(--espresso); color: var(--white); }

  /* Sort toggle */
  .col-sort-wrap { display: flex; gap: 8px; }
  .col-sort-opt {
    flex: 1;
    padding: 9px 6px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid var(--linen);
    background: none;
    color: var(--mink);
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }
  .col-sort-opt.active { background: var(--espresso); color: var(--white); border-color: var(--espresso); }
  .col-sort-opt:hover:not(.active) { border-color: var(--espresso); color: var(--espresso); }

  /* ── MAIN CONTENT ── */
  .col-main { flex: 1; min-width: 0; }

  .col-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--linen);
  }
  .col-count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: var(--ink);
  }
  .col-count span { font-size: 12px; font-family: 'DM Sans', sans-serif; color: var(--mink); margin-left: 6px; letter-spacing: 0.08em; }

  /* ── VIEW TOGGLE ── */
  .col-view-toggle { display: flex; gap: 4px; }
  .col-view-btn {
    width: 34px; height: 34px;
    border: 1px solid var(--linen);
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mink);
    transition: all 0.2s;
    font-size: 14px;
  }
  .col-view-btn.active { background: var(--espresso); border-color: var(--espresso); color: white; }
  .col-view-btn:hover:not(.active) { border-color: var(--espresso); color: var(--espresso); }

  /* ── GRID ── */
  .col-grid { display: grid; gap: 24px; }
  .col-grid.grid-4 { grid-template-columns: repeat(4, 1fr); }
  .col-grid.grid-3 { grid-template-columns: repeat(3, 1fr); }
  .col-grid.grid-2 { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 1200px) { .col-grid.grid-4 { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 900px)  { .col-grid.grid-4, .col-grid.grid-3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .col-grid { grid-template-columns: repeat(2, 1fr) !important; } }

  /* ── PRODUCT CARD ── */
  .col-card {
    position: relative;
    animation: fadeSlideUp 0.45s ease both;
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .col-card-img-wrap {
    position: relative;
    overflow: hidden;
    background: var(--stone);
    aspect-ratio: 3/4;
  }
  .col-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }
  .col-card:hover .col-card-img { transform: scale(1.06); }

  /* Category tag */
  .col-card-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    background: rgba(255,255,255,0.9);
    color: var(--espresso);
    padding: 4px 10px;
    font-weight: 500;
    backdrop-filter: blur(4px);
  }

  /* Wishlist */
  .col-wish-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(4px);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: transform 0.2s, background 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 2;
  }
  .col-wish-btn:hover { transform: scale(1.15); background: white; }
  .col-wish-btn.wishlisted { background: #FEE2E2; }

  /* Quick view overlay */
  .col-card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(62,47,37,0.75);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(2px);
  }
  .col-card:hover .col-card-overlay { opacity: 1; }
  .col-overlay-btn {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    background: none;
    border: 1px solid rgba(255,255,255,0.6);
    padding: 10px 24px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    display: inline-block;
  }
  .col-overlay-btn:hover { background: white; color: var(--espresso); border-color: white; }

  /* Card info */
  .col-card-info { padding: 14px 0 0; }
  .col-card-name {
    font-size: 13px;
    color: var(--ink);
    letter-spacing: 0.02em;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .col-card-meta { display: flex; align-items: center; justify-content: space-between; }
  .col-card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-weight: 500;
    color: var(--espresso);
  }
  .col-card-sub { font-size: 10px; color: var(--mink); letter-spacing: 0.1em; text-transform: uppercase; }

  /* ── ACTIVE FILTERS STRIP ── */
  .col-active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }
  .col-filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: var(--stone);
    border: 1px solid var(--linen);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--espresso);
  }
  .col-filter-chip button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--mink);
    font-size: 13px;
    line-height: 1;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .col-filter-chip button:hover { color: var(--espresso); }

  /* ── EMPTY STATE ── */
  .col-empty {
    text-align: center;
    padding: 80px 24px;
    border: 1px dashed var(--linen);
  }
  .col-empty-icon { font-size: 40px; margin-bottom: 16px; opacity: 0.4; }
  .col-empty-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: var(--mink);
    margin-bottom: 8px;
  }
  .col-empty-sub { font-size: 12px; color: var(--mink); letter-spacing: 0.08em; }

  /* Responsive sidebar */
  @media (max-width: 1024px) {
    .col-sidebar { display: none; }
    .col-layout { padding: 24px 20px 60px; }
  }
  @media (max-width: 640px) {
    .col-cat-btn { padding: 16px 18px; font-size: 10px; }
    .col-layout { gap: 0; }
  }
`;

const Collection = () => {
  const {
    products,
    search,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(ShopContext);

  // Read category from query string
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialCategory = searchParams && searchParams.get("category") ? searchParams.get("category") : "All";

  const [category, setCategory] = useState(initialCategory);
  const [subCategory, setSubCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState(50000);
  const [gridSize, setGridSize] = useState(4);

  // Count products per category for the strip badges
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const subCategoryCounts = useMemo(() => {
    const base = category === "All" ? products : products.filter((p) => p.category === category);
    const counts = { All: base.length };
    base.forEach((p) => {
      counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
    });
    return counts;
  }, [products, category]);

  const filteredProducts = useMemo(() => {
    let items = [...products];
    if (search) items = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") items = items.filter((p) => p.category === category);
    if (subCategory !== "All") items = items.filter((p) => p.subCategory === subCategory);
    items = items.filter((p) => p.price <= priceRange);
    if (sortOption === "low-high") items.sort((a, b) => a.price - b.price);
    if (sortOption === "high-low") items.sort((a, b) => b.price - a.price);
    return items;
  }, [products, search, category, subCategory, sortOption, priceRange]);

  const isInWishlist = (id) => wishlist?.some((item) => item._id === id);

  const activeFilters = [
    category !== "All" && { label: category, clear: () => setCategory("All") },
    subCategory !== "All" && { label: subCategory, clear: () => setSubCategory("All") },
    sortOption && { label: sortOption === "low-high" ? "Price ↑" : "Price ↓", clear: () => setSortOption("") },
    priceRange < 50000 && { label: `≤ ₹${priceRange.toLocaleString()}`, clear: () => setPriceRange(50000) },
  ].filter(Boolean);

  const pricePct = Math.round((priceRange / 50000) * 100);

  const categories = ["All", "Men", "Women", "Kids"];
  const subCategories = ["All", "Topwear", "Bottomwear", "Winterwear"];

  return (
    <div className="col-root">
      <style>{STYLES}</style>
      <SearchBar />

      {/* PAGE HEADER */}
      <div className="col-header">
        <p className="col-eyebrow">Curated for you</p>
        <h1 className="col-heading">The <em>Collection</em></h1>
        <p className="col-subheading">Timeless fashion for everyone</p>
      </div>

      {/* STICKY CATEGORY STRIP */}
      <div className="col-cat-strip">
        <div className="col-cat-inner">
          {categories.map((cat, i) => (
            <React.Fragment key={cat}>
              {i > 0 && <div className="col-cat-sep" />}
              <button
                className={`col-cat-btn ${category === cat ? "active" : ""}`}
                data-count={categoryCounts[cat] || 0}
                onClick={() => { setCategory(cat); setSubCategory("All"); }}
              >
                {cat}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="col-layout">

        {/* SIDEBAR */}
        <aside className="col-sidebar">
          <div className="col-sidebar-card">
            <p className="col-sidebar-title">Refine</p>

            {/* Subcategory with scroll */}
            <div className="col-filter-section">
              <span className="col-filter-label">Style</span>
              <div className="col-sub-scroll">
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    className={`col-sub-btn ${subCategory === sub ? "active" : ""}`}
                    onClick={() => setSubCategory(sub)}
                  >
                    {sub}
                    <span className="col-sub-count">{subCategoryCounts[sub] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="col-filter-section">
              <span className="col-filter-label">Budget</span>
              <input
                type="range"
                className="col-price-slider"
                min="0" max="50000" step="100"
                value={priceRange}
                style={{ "--pct": `${pricePct}%` }}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="col-price-label">
                <span>₹0</span>
                <span className="col-price-val">₹{priceRange.toLocaleString()}</span>
                <span>₹50k</span>
              </div>
            </div>

            {/* Sort */}
            <div className="col-filter-section">
              <span className="col-filter-label">Sort by price</span>
              <div className="col-sort-wrap">
                <button
                  className={`col-sort-opt ${sortOption === "low-high" ? "active" : ""}`}
                  onClick={() => setSortOption(sortOption === "low-high" ? "" : "low-high")}
                >Low → High</button>
                <button
                  className={`col-sort-opt ${sortOption === "high-low" ? "active" : ""}`}
                  onClick={() => setSortOption(sortOption === "high-low" ? "" : "high-low")}
                >High → Low</button>
              </div>
            </div>

            <button
              className="col-reset-btn"
              onClick={() => { setCategory("All"); setSubCategory("All"); setSortOption(""); setPriceRange(50000); }}
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <section className="col-main">

          {/* TOP BAR */}
          <div className="col-topbar">
            <p className="col-count">
              {filteredProducts.length}
              <span>items found</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Grid size toggle */}
              <div className="col-view-toggle">
                {[
                  { size: 2, icon: "▦" },
                  { size: 3, icon: "⊞" },
                  { size: 4, icon: "⊟" },
                ].map(({ size, icon }) => (
                  <button
                    key={size}
                    className={`col-view-btn ${gridSize === size ? "active" : ""}`}
                    onClick={() => setGridSize(size)}
                    title={`${size} columns`}
                  >{icon}</button>
                ))}
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {activeFilters.length > 0 && (
            <div className="col-active-filters">
              {activeFilters.map((f, i) => (
                <span key={i} className="col-filter-chip">
                  {f.label}
                  <button onClick={f.clear}>×</button>
                </span>
              ))}
            </div>
          )}

          {/* PRODUCT GRID */}
          {filteredProducts.length === 0 ? (
            <div className="col-empty">
              <div className="col-empty-icon">◇</div>
              <p className="col-empty-text">No pieces found</p>
              <p className="col-empty-sub">Try adjusting your filters</p>
            </div>
          ) : (
            <div className={`col-grid grid-${gridSize}`}>
              {filteredProducts.map((item, idx) => (
                <div
                  key={item._id}
                  className="col-card"
                  style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
                >
                  <div className="col-card-img-wrap">
                    {/* Category tag */}
                    <span className="col-card-tag">{item.subCategory || item.category}</span>

                    {/* Wishlist */}
                    <button
                      className={`col-wish-btn ${isInWishlist(item._id) ? "wishlisted" : ""}`}
                      onClick={() => isInWishlist(item._id) ? removeFromWishlist(item._id) : addToWishlist(item._id)}
                    >
                      {isInWishlist(item._id) ? "♥" : "♡"}
                    </button>

                    {/* Image */}
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        className="col-card-img"
                        loading="lazy"
                      />
                    </Link>

                    {/* Hover overlay */}
                    <div className="col-card-overlay">
                      <Link to={`/product/${item._id}`} className="col-overlay-btn">
                        View Product
                      </Link>
                    </div>
                  </div>

                  <div className="col-card-info">
                    <p className="col-card-name">{item.name}</p>
                    <div className="col-card-meta">
                      <span className="col-card-price">₹{item.price?.toLocaleString("en-IN")}</span>
                      <span className="col-card-sub">{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Collection;