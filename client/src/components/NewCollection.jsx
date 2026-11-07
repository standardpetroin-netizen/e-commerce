import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";

const NewCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
      // ✅ FIX: Show ALL latest products, not just bestsellers
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Prata&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nc-section {
          background: #F5EFE7;
          padding: 5rem 1.5rem 6rem;
          position: relative;
          overflow: hidden;
        }

        .nc-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
          z-index: 0;
        }

        .nc-inner {
          position: relative;
          z-index: 1;
          max-width: 1300px;
          margin: 0 auto;
        }

        .nc-header {
          text-align: center;
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .nc-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .nc-eyebrow-line {
          width: 2rem;
          height: 1.5px;
          background: #8B5E3C;
          display: block;
        }
        .nc-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          font-weight: 600;
          text-transform: uppercase;
          color: #8B5E3C;
        }

        .nc-title {
          font-family: 'Prata', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: #2C2C2C;
          font-weight: 700;
          margin: 0 0 1rem;
          line-height: 1.15;
        }
        .nc-title span { color: #8B5E3C; }

        .nc-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #6B5E55;
          max-width: 30rem;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }

        .nc-search-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .nc-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem auto 3.5rem;
          max-width: 200px;
        }
        .nc-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #C6A27E, transparent);
        }
        .nc-divider-diamond {
          width: 7px;
          height: 7px;
          background: #8B5E3C;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .nc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem 1rem;
        }
        @media (min-width: 640px)  { .nc-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px)  { .nc-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .nc-grid { grid-template-columns: repeat(5, 1fr); } }

        .nc-card-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .nc-card-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nc-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: 3.5rem;
          opacity: 0;
          transition: opacity 0.6s ease 0.4s;
        }
        .nc-cta-wrap.visible { opacity: 1; }

        .nc-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          padding: 0.85rem 2.5rem;
          border: 1.5px solid #5A3E2B;
          color: #5A3E2B;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease;
          cursor: pointer;
        }
        .nc-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #5A3E2B;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }
        .nc-cta:hover::before { transform: scaleX(1); }
        .nc-cta:hover { color: #F5EFE7; }
        .nc-cta span { position: relative; z-index: 1; }
        .nc-cta-arrow {
          position: relative;
          z-index: 1;
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .nc-cta:hover .nc-cta-arrow { transform: translateX(5px); }
      `}</style>

      <section className="nc-section">
        <div className="nc-inner">

          <div className={`nc-header ${visible ? "visible" : ""}`}>
            <div className="nc-eyebrow">
              <span className="nc-eyebrow-line" />
              <span className="nc-eyebrow-text">Fresh In Store</span>
              <span className="nc-eyebrow-line" />
            </div>

            <h2 className="nc-title">
              Latest <span>Collection</span>
            </h2>

            <p className="nc-desc">
              Explore our newest arrivals — handpicked styles crafted for comfort,
              elegance, and everyday confidence.
            </p>

            <div className="nc-search-wrap">
              <SearchBar />
            </div>
          </div>

          <div className="nc-divider">
            <span className="nc-divider-line" />
            <span className="nc-divider-diamond" />
            <span className="nc-divider-line" />
          </div>

          {/* ── Product Grid ── */}
          {latestProducts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#8B5E3C", fontFamily: "DM Sans", padding: "2rem" }}>
              Loading products...
            </p>
          ) : (
            <div className="nc-grid">
              {latestProducts.map((item, i) => (
                <div
                  key={item._id}
                  className={`nc-card-wrap ${visible ? "visible" : ""}`}
                  style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
                >
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={`nc-cta-wrap ${visible ? "visible" : ""}`}>
            <a href="/collection" className="nc-cta">
              <span>View All Arrivals</span>
              <span className="nc-cta-arrow">→</span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default NewCollection;