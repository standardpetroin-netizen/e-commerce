import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

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

  .wl-root *, .wl-root *::before, .wl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .wl-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--espresso);
    min-height: 100vh;
  }

  /* ── PAGE HEADER ── */
  .wl-header {
    text-align: center;
    padding: 72px 24px 56px;
    border-bottom: 1px solid var(--linen);
    background: var(--stone);
    position: relative;
    overflow: hidden;
  }
  .wl-header::before {
    content: 'WISHLIST';
    position: absolute;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(80px, 14vw, 200px);
    font-weight: 300;
    color: rgba(62,47,37,0.04);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }
  .wl-eyebrow {
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--brown-lt);
    margin-bottom: 12px;
  }
  .wl-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 58px);
    font-weight: 300;
    color: var(--ink);
    line-height: 1;
    margin-bottom: 8px;
  }
  .wl-heading em { font-style: italic; color: var(--brown); }
  .wl-count-label {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--mink);
  }

  /* ── LAYOUT ── */
  .wl-layout {
    max-width: 1100px;
    margin: 0 auto;
    padding: 56px 40px 100px;
  }
  @media (max-width: 640px) { .wl-layout { padding: 32px 20px 80px; } }

  /* ── TOP BAR ── */
  .wl-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--linen);
  }
  .wl-total-count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: var(--ink);
  }
  .wl-total-count span {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: var(--mink);
    margin-left: 6px;
    letter-spacing: 0.08em;
  }
  .wl-continue-top {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--espresso);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: gap 0.25s, color 0.25s;
  }
  .wl-continue-top:hover { color: var(--brown-lt); gap: 14px; }

  /* ── ITEM LIST ── */
  .wl-list { display: flex; flex-direction: column; }

  .wl-item {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 28px;
    align-items: start;
    padding: 28px 0;
    border-bottom: 1px solid var(--linen);
    animation: wl-fadein 0.4s ease both;
  }
  .wl-item:first-child { border-top: 1px solid var(--linen); }
  @keyframes wl-fadein {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 560px) {
    .wl-item { grid-template-columns: 90px 1fr; gap: 16px; }
    .wl-item-actions { grid-column: 1 / -1; }
  }

  /* IMAGE */
  .wl-img-wrap {
    position: relative;
    overflow: hidden;
    background: var(--stone);
    aspect-ratio: 3/4;
    cursor: pointer;
  }
  .wl-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .wl-img-wrap:hover .wl-img { transform: scale(1.06); }
  .wl-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mink);
  }

  /* DETAILS */
  .wl-details {}
  .wl-cat {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-lt);
    margin-bottom: 8px;
  }
  .wl-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 300;
    color: var(--ink);
    line-height: 1.2;
    margin-bottom: 12px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .wl-name:hover { color: var(--brown); }
  .wl-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    color: var(--espresso);
    margin-bottom: 20px;
  }

  .wl-btns { display: flex; gap: 10px; flex-wrap: wrap; }
  .wl-cart-btn {
    padding: 12px 24px;
    background: var(--espresso);
    color: var(--white);
    border: 1px solid var(--espresso);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.25s;
  }
  .wl-cart-btn:hover { background: var(--brown); border-color: var(--brown); }

  .wl-view-btn {
    padding: 12px 20px;
    background: none;
    border: 1px solid var(--linen);
    color: var(--espresso);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }
  .wl-view-btn:hover { border-color: var(--espresso); }

  /* REMOVE */
  .wl-remove {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--mink);
    transition: color 0.2s, transform 0.2s;
    padding: 4px;
    line-height: 1;
    align-self: start;
    margin-top: 2px;
  }
  .wl-remove:hover { color: #DC2626; transform: scale(1.1); }

  /* ── BOTTOM BAR ── */
  .wl-bottombar {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }
  .wl-continue-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border: 1px solid var(--espresso);
    background: none;
    color: var(--espresso);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.25s, color 0.25s;
  }
  .wl-continue-btn:hover { background: var(--espresso); color: var(--white); }

  /* ── EMPTY STATE ── */
  .wl-empty {
    text-align: center;
    padding: 100px 24px;
    max-width: 400px;
    margin: 0 auto;
  }
  .wl-empty-glyph {
    font-size: 48px;
    color: var(--linen);
    margin-bottom: 24px;
    display: block;
    font-family: 'Cormorant Garamond', serif;
  }
  .wl-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: var(--ink);
    margin-bottom: 12px;
  }
  .wl-empty-sub {
    font-size: 13px;
    color: var(--mink);
    letter-spacing: 0.04em;
    line-height: 1.7;
    margin-bottom: 36px;
  }
  .wl-empty-btn {
    padding: 14px 40px;
    background: var(--espresso);
    color: var(--white);
    border: none;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.25s;
  }
  .wl-empty-btn:hover { background: var(--brown); }

  /* ── NOT LOGGED IN ── */
  .wl-auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
    text-align: center;
    padding: 40px;
  }
  .wl-auth-glyph {
    font-family: 'Cormorant Garamond', serif;
    font-size: 64px;
    font-weight: 300;
    color: var(--linen);
    margin-bottom: 20px;
    line-height: 1;
  }
  .wl-auth-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: var(--ink);
    margin-bottom: 10px;
  }
  .wl-auth-sub {
    font-size: 12px;
    color: var(--mink);
    letter-spacing: 0.08em;
    margin-bottom: 32px;
  }
  .wl-auth-btn {
    padding: 14px 40px;
    background: var(--espresso);
    color: var(--white);
    border: none;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.25s;
  }
  .wl-auth-btn:hover { background: var(--brown); }
`;

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart, currency, token } = useContext(ShopContext);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    toast.success("Added to cart");
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  /* ── NOT LOGGED IN ── */
  if (!token) {
    return (
      <div className="wl-root">
        <style>{STYLES}</style>
        <div className="wl-auth">
          <span className="wl-auth-glyph">♡</span>
          <h2 className="wl-auth-title">Sign in to view your wishlist</h2>
          <p className="wl-auth-sub">Save your favourite pieces and come back to them anytime</p>
          <button className="wl-auth-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  /* ── EMPTY ── */
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="wl-root">
        <style>{STYLES}</style>
        <div className="wl-header">
          <p className="wl-eyebrow">Saved for later</p>
          <h1 className="wl-heading">My <em>Wishlist</em></h1>
        </div>
        <div className="wl-layout">
          <div className="wl-empty">
            <span className="wl-empty-glyph">♡</span>
            <h3 className="wl-empty-title">Nothing saved yet</h3>
            <p className="wl-empty-sub">
              Browse the collection and heart the pieces that speak to you. They'll live here until you're ready.
            </p>
            <button className="wl-empty-btn" onClick={() => navigate("/collection")}>
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── WISHLIST ── */
  return (
    <div className="wl-root">
      <style>{STYLES}</style>

      {/* HEADER */}
      <div className="wl-header">
        <p className="wl-eyebrow">Saved for later</p>
        <h1 className="wl-heading">My <em>Wishlist</em></h1>
        <p className="wl-count-label">{wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved</p>
      </div>

      <div className="wl-layout">

        {/* TOP BAR */}
        <div className="wl-topbar">
          <p className="wl-total-count">
            {wishlist.length}
            <span>{wishlist.length === 1 ? "item" : "items"}</span>
          </p>
          <button className="wl-continue-top" onClick={() => navigate("/collection")}>
            Continue Shopping →
          </button>
        </div>

        {/* LIST */}
        <div className="wl-list">
          {wishlist.map((item, idx) => (
            <div
              key={item._id}
              className="wl-item"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* IMAGE */}
              <div className="wl-img-wrap" onClick={() => handleViewProduct(item._id)}>
                {item.image && (Array.isArray(item.image) ? item.image.length > 0 : item.image) ? (
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt={item.name}
                    className="wl-img"
                  />
                ) : (
                  <div className="wl-img-placeholder">No image</div>
                )}
              </div>

              {/* DETAILS */}
              <div className="wl-details">
                <p className="wl-cat">{item.category}</p>
                <h3 className="wl-name" onClick={() => handleViewProduct(item._id)}>
                  {item.name}
                </h3>
                <p className="wl-price">{currency}{item.price?.toLocaleString("en-IN")}</p>
                <div className="wl-btns">
                  <button className="wl-cart-btn" onClick={() => handleAddToCart(item._id)}>
                    Add to Cart
                  </button>
                  <button className="wl-view-btn" onClick={() => handleViewProduct(item._id)}>
                    View Details
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                className="wl-remove"
                onClick={() => handleRemoveFromWishlist(item._id)}
                title="Remove from wishlist"
              >
                ♥
              </button>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="wl-bottombar">
          <button className="wl-continue-btn" onClick={() => navigate("/collection")}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;