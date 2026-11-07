import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap');

:root{
  --bg:#0F0F12;
  --card:#18181C;
  --card2:#1F1F24;
  --border:#2A2A30;
  --gold:#C8A96A;
  --gold-soft:#E3CFA0;
  --text:#F4F4F5;
  --muted:#A1A1AA;
  --accent:#8B5CF6;
}

.pf-root{
  background:var(--bg);
  color:var(--text);
  min-height:100vh;
  font-family:Inter,sans-serif;
}

/* HEADER */

.pf-header{
  padding:80px 48px 48px;
  background:linear-gradient(180deg,#141418,#0F0F12);
  border-bottom:1px solid var(--border);
}

.pf-heading{
  font-family:'Playfair Display',serif;
  font-size:48px;
  color:var(--gold-soft);
}

.pf-user-line{
  color:var(--muted);
  margin-top:8px;
}

.pf-user-name{
  color:var(--gold);
  font-weight:500;
}

/* TABS */

.pf-tabs-wrap{
  background:#111115;
  border-bottom:1px solid var(--border);
}

.pf-tabs{
  max-width:1200px;
  margin:auto;
  display:flex;
}

.pf-tab{
  padding:18px 28px;
  background:none;
  border:none;
  color:var(--muted);
  cursor:pointer;
  text-transform:uppercase;
  font-size:11px;
  letter-spacing:.15em;
  border-bottom:2px solid transparent;
  transition:.25s;
}

.pf-tab:hover{color:var(--text)}

.pf-tab.active{
  color:var(--gold);
  border-color:var(--gold);
}

/* BODY */

.pf-body{
  max-width:1200px;
  margin:auto;
  padding:48px;
}

/* STATS */

.pf-stats-row{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-bottom:40px;
}

.pf-stat-cell{
  background:var(--card);
  border:1px solid var(--border);
  padding:28px;
  text-align:center;
}

.pf-stat-num{
  font-family:'Playfair Display',serif;
  font-size:38px;
  color:var(--gold);
}

.pf-stat-lbl{
  font-size:11px;
  color:var(--muted);
  letter-spacing:.15em;
  text-transform:uppercase;
}

/* CARDS */

.pf-card{
  background:var(--card);
  border:1px solid var(--border);
  margin-bottom:28px;
}

.pf-card-header{
  padding:18px 24px;
  border-bottom:1px solid var(--border);
  color:var(--gold);
  text-transform:uppercase;
  font-size:11px;
  letter-spacing:.18em;
}

.pf-card-body{
  padding:28px;
}

/* INFO GRID */

.pf-info-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:28px;
}

.pf-info-key{
  font-size:10px;
  color:var(--muted);
  letter-spacing:.15em;
  text-transform:uppercase;
  margin-bottom:4px;
}

.pf-info-val{
  font-size:15px;
}

/* ORDERS */

.pf-order-card{
  background:var(--card);
  border:1px solid var(--border);
  margin-bottom:22px;
  transition:.3s;
}

.pf-order-card:hover{
  border-color:var(--gold);
  transform:translateY(-2px);
}

.pf-order-head{
  display:flex;
  justify-content:space-between;
  padding:20px 24px;
  border-bottom:1px solid var(--border);
}

.pf-order-id{
  color:var(--gold);
  font-family:'Playfair Display',serif;
}

.pf-order-date{
  font-size:12px;
  color:var(--muted);
}

.pf-order-amount{
  font-size:20px;
  font-family:'Playfair Display',serif;
}

.pf-badge{
  font-size:10px;
  text-transform:uppercase;
  letter-spacing:.12em;
  margin-top:6px;
}

.pf-badge-delivered{color:#4ADE80}
.pf-badge-cancelled{color:#F87171}
.pf-badge-pending{color:#FACC15}

/* ITEMS */

.pf-order-item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:18px 24px;
  border-bottom:1px solid var(--border);
}

.pf-item-left{
  display:flex;
  gap:16px;
}

.pf-item-img{
  width:70px;
  height:90px;
  object-fit:cover;
  border-radius:4px;
}

.pf-item-name{
  font-size:14px;
}

.pf-item-price{
  color:var(--muted);
}

.pf-buy-again{
  background:none;
  border:1px solid var(--border);
  color:var(--text);
  padding:8px 18px;
  cursor:pointer;
  text-transform:uppercase;
  font-size:10px;
  letter-spacing:.12em;
}

.pf-buy-again:hover{
  border-color:var(--gold);
  color:var(--gold);
}

/* WISHLIST */

.pf-wl-item{
  display:grid;
  grid-template-columns:120px 1fr auto;
  gap:24px;
  padding:24px 0;
  border-bottom:1px solid var(--border);
}

.pf-wl-img-wrap{
  aspect-ratio:3/4;
  overflow:hidden;
}

.pf-wl-img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.pf-wl-cat{
  font-size:10px;
  color:var(--muted);
  text-transform:uppercase;
  letter-spacing:.15em;
}

.pf-wl-name{
  font-family:'Playfair Display',serif;
  font-size:22px;
  margin:6px 0;
}

.pf-wl-price{
  color:var(--gold);
  font-size:18px;
}

.pf-wl-btns{
  margin-top:14px;
  display:flex;
  gap:10px;
}

.pf-wl-cart{
  background:var(--gold);
  color:#000;
  border:none;
  padding:10px 18px;
  font-size:11px;
  text-transform:uppercase;
  cursor:pointer;
}

.pf-wl-view{
  background:none;
  border:1px solid var(--border);
  color:var(--text);
  padding:10px 16px;
  font-size:11px;
  cursor:pointer;
}

.pf-wl-remove{
  background:none;
  border:none;
  color:var(--muted);
  font-size:20px;
  cursor:pointer;
}

.pf-wl-remove:hover{color:#F87171}

/* EMPTY */

.pf-empty{
  text-align:center;
  padding:80px 0;
  color:var(--muted);
}

.pf-empty-title{
  font-family:'Playfair Display',serif;
  font-size:28px;
  margin-bottom:6px;
}

/* LOADING */

.pf-loading{
  display:flex;
  align-items:center;
  justify-content:center;
  height:70vh;
}

.pf-spinner{
  width:42px;
  height:42px;
  border:2px solid var(--border);
  border-top:2px solid var(--gold);
  border-radius:50%;
  animation:spin 1s linear infinite;
}

@keyframes spin{
  to{transform:rotate(360deg)}
}

`;

const Profile = () => {
  const { currency, wishlist, removeFromWishlist, addToCart, token, isContextReady, API_URL } = useContext(ShopContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isContextReady) return;
    if (!token) { navigate("/login"); return; }

    const fetchData = async () => {
      try {
        const authToken = token || localStorage.getItem("token");
        if (!authToken) { navigate("/login"); return; }

        const config = { headers: { Authorization: `Bearer ${authToken}` } };

        const profileRes = await axios.get(`${API_URL}/user/profile`, config);
        const ordersRes  = await axios.get(`${API_URL}/order/user-orders`, config);

        if (profileRes.data.success) setUser(profileRes.data.user);
        if (ordersRes.data.success)  setOrders(ordersRes.data.orders);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        toast.error("Failed to load profile data");
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isContextReady, navigate]);

  const handleRemoveFromWishlist = (productId) => { removeFromWishlist(productId); toast.success("Removed from wishlist"); };
  const handleAddToCart          = (productId) => { addToCart(productId, 1); toast.success("Added to cart"); };
  const handleViewProduct        = (productId) => navigate(`/product/${productId}`);

  const badgeClass = (status) => {
    if (status === "Delivered") return "pf-badge pf-badge-delivered";
    if (status === "Cancelled") return "pf-badge pf-badge-cancelled";
    return "pf-badge pf-badge-pending";
  };

  if (!isContextReady || loading) {
    return (
      <div className="pf-root">
        <style>{STYLES}</style>
        <div className="pf-loading">
          <div className="pf-spinner" />
          <span className="pf-loading-text">Loading</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pf-root">
        <style>{STYLES}</style>
        <div className="pf-loading">
          <span className="pf-loading-text" style={{ marginBottom: 20 }}>Unable to load profile</span>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "12px 32px", background: "var(--espresso)", color: "#fff", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "profile",  label: "Profile",  count: null },
    { key: "orders",   label: "Orders",   count: orders.length },
    { key: "wishlist", label: "Wishlist", count: wishlist?.length || 0 },
  ];

  return (
    <div className="pf-root">
      <style>{STYLES}</style>

      {/* ── HEADER ── */}
      <div className="pf-header">
        <div className="pf-header-inner">
          <div>
            <p className="pf-eyebrow">Member Account</p>
            <h1 className="pf-heading">My <em>Profile</em></h1>
            <p className="pf-user-line">
              Welcome back, <span className="pf-user-name">{user.name}</span>
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mink)", marginBottom: 4 }}>Member since</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "var(--espresso)" }}>
              {new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
            </p>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="pf-tabs-wrap">
        <div className="pf-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`pf-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
              {t.count !== null && (
                <span className="pf-tab-count">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="pf-body">

        {/* ═══ PROFILE TAB ═══ */}
        {activeTab === "profile" && (
          <div className="pf-fade">

            {/* Stats row */}
            <div className="pf-stats-row">
              <div className="pf-stat-cell">
                <p className="pf-stat-num">{orders.length}</p>
                <p className="pf-stat-lbl">Total Orders</p>
              </div>
              <div className="pf-stat-cell">
                <p className="pf-stat-num">{wishlist?.length || 0}</p>
                <p className="pf-stat-lbl">Wishlist Items</p>
              </div>
              <div className="pf-stat-cell">
                <p className="pf-stat-num">
                  {orders.filter((o) => o.status === "Delivered").length}
                </p>
                <p className="pf-stat-lbl">Delivered</p>
              </div>
            </div>

            {/* Personal info */}
            <div className="pf-card">
              <div className="pf-card-header">
                <span className="pf-card-header-icon">◈</span>
                <span className="pf-card-header-title">Personal Information</span>
              </div>
              <div className="pf-card-body">
                <div className="pf-info-grid">
                  {[
                    { k: "Full Name",  v: user.name },
                    { k: "Email",      v: user.email },
                    { k: "Phone",      v: user.phone },
                    { k: "Role",       v: user.role || "Customer" },
                  ].map(({ k, v }) => (
                    <div key={k} className="pf-info-cell">
                      <p className="pf-info-key">{k}</p>
                      <p className={`pf-info-val ${!v ? "empty" : ""}`}>{v || "Not provided"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Address info */}
            <div className="pf-card">
              <div className="pf-card-header">
                <span className="pf-card-header-icon">◉</span>
                <span className="pf-card-header-title">Delivery Address</span>
              </div>
              <div className="pf-card-body">
                <div className="pf-info-grid">
                  {[
                    { k: "Street Address", v: user.address },
                    { k: "City",           v: user.city },
                    { k: "State",          v: user.state },
                    { k: "ZIP Code",       v: user.zipCode },
                    { k: "Country",        v: user.country },
                  ].map(({ k, v }) => (
                    <div key={k} className="pf-info-cell">
                      <p className="pf-info-key">{k}</p>
                      <p className={`pf-info-val ${!v ? "empty" : ""}`}>{v || "Not provided"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ORDERS TAB ═══ */}
        {activeTab === "orders" && (
          <div className="pf-fade">
            {orders.length === 0 ? (
              <div className="pf-empty">
                <span className="pf-empty-glyph">◇</span>
                <p className="pf-empty-title">No orders yet</p>
                <p className="pf-empty-sub">Your order history will appear here</p>
              </div>
            ) : (
              orders.map((order, idx) => (
                <div
                  key={order._id}
                  className="pf-order-card"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Order head */}
                  <div className="pf-order-head">
                    <div>
                      <p className="pf-order-id">#{order._id?.slice(-10).toUpperCase()}</p>
                      <p className="pf-order-date">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <div className="pf-order-right">
                      <p className="pf-order-amount">{currency}{order.amount?.toLocaleString("en-IN")}</p>
                      <span className={badgeClass(order.status)}>{order.status}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="pf-order-items">
                    {order.items?.map((item, i) => (
                      <div key={i} className="pf-order-item">
                        <div className="pf-item-left">
                          <img src={item.image} alt={item.name} className="pf-item-img" />
                          <div>
                            <p className="pf-item-name">{item.name}</p>
                            <p className="pf-item-price">{currency}{item.price?.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                        <button className="pf-buy-again">Buy Again</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ═══ WISHLIST TAB ═══ */}
        {activeTab === "wishlist" && (
          <div className="pf-fade">
            {!wishlist || wishlist.length === 0 ? (
              <div className="pf-empty">
                <span className="pf-empty-glyph">♡</span>
                <p className="pf-empty-title">Your wishlist is empty</p>
                <p className="pf-empty-sub">Save pieces you love and find them here</p>
              </div>
            ) : (
              wishlist.map((item, idx) => (
                <div
                  key={item._id}
                  className="pf-wl-item"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="pf-wl-img-wrap" onClick={() => handleViewProduct(item._id)}>
                    {item.image ? (
                      <img
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        className="pf-wl-img"
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--mink)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        No image
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="pf-wl-cat">{item.category}</p>
                    <h3 className="pf-wl-name" onClick={() => handleViewProduct(item._id)}>{item.name}</h3>
                    <p className="pf-wl-price">{currency}{item.price?.toLocaleString("en-IN")}</p>
                    <div className="pf-wl-btns">
                      <button className="pf-wl-cart" onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                      <button className="pf-wl-view" onClick={() => handleViewProduct(item._id)}>View Details</button>
                    </div>
                  </div>

                  <button
                    className="pf-wl-remove"
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    title="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;