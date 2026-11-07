import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);

  /* ================= HERO SLIDES ================= */

  const heroSlides = [
    {
      id: 1,
      title: "LATEST ARRIVALS",
      subtitle: "OUR BESTSELLERS",
      description:
        "Discover the season's hottest collections with exclusive new arrivals",
      image:
        "https://apexdisplay.com.au/wp-content/uploads/2024/02/UniSlot-Wallmount-Concept-5-1.webp",
      cta: "SHOP NOW",
      link: "/collection",
    },
    {
      id: 2,
      title: "SUMMER COLLECTION",
      subtitle: "CURATED FOR EVERYONE",
      description:
        "Premium fashion for men, women and kids — crafted for comfort, style and everyday luxury.",
      image:
        "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?w=740",
      cta: "EXPLORE COLLECTION",
      link: "/collection",
    },
    {
      id: 3,
      title: "EXCLUSIVE OFFERS",
      subtitle: "LIMITED TIME",
      description:
        "Get up to 50% off on selected items. Elevate your wardrobe today.",
      image:
        "https://img.freepik.com/free-vector/sale-up-50-off-vector_53876-57827.jpg?w=740",
      cta: "GRAB NOW",
      link: "/collection",
    },
  ];

  /* ================= CATEGORIES ================= */

  // 🔥 id = used for filtering (must match product.category)
  // label = UI display only

  const categories = [
    {
      id: "Men",
      label: "MEN",
      subtitle: "Refined Essentials",
      description: "Tailored fits & contemporary classics",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    },
    {
      id: "Women",
      label: "WOMEN",
      subtitle: "Effortless Elegance",
      description: "Curated styles for every occasion",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    },
    {
      id: "Kids",
      label: "KIDS",
      subtitle: "Playful & Bright",
      description: "Comfortable styles little ones love",
      image:
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    },
  ];

  /* ================= AUTO SLIDE ================= */

  useEffect(() => {
    if (pausedByUser) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pausedByUser, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setPausedByUser(true);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setPausedByUser(true);
  };

  /* ================= UI ================= */

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}

      <div className="relative w-full h-screen overflow-hidden bg-[#F5EFE7]">

        {heroSlides.map((slide, i) => {
          const isActive = i === currentSlide;

          return (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.8s ease",
                pointerEvents: isActive ? "auto" : "none",
                display: "flex",
              }}
            >
              {/* LEFT TEXT */}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4rem",
                  background: "#F5EFE7",
                }}
              >
                <div style={{ maxWidth: "28rem" }}>
                  <p className="uppercase tracking-widest text-sm mb-2 text-[#8B5E3C]">
                    {slide.subtitle}
                  </p>

                  <h1 className="text-4xl font-bold mb-4 font-prata">
                    {slide.title}
                  </h1>

                  <p className="text-[#6B5E55] mb-6">
                    {slide.description}
                  </p>

                  <Link
                    to={slide.link}
                    className="font-semibold tracking-widest text-[#5A3E2B]"
                  >
                    {slide.cta} →
                  </Link>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div style={{ width: "50%" }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-full w-11 h-11 shadow"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-full w-11 h-11 shadow"
        >
          ›
        </button>
      </div>

      {/* ================= CATEGORY SECTION ================= */}

      <section className="bg-[#F5EFE7] py-20 px-6">
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-sm text-[#8B5E3C]">
            Shop By Category
          </p>
          <h2 className="text-3xl font-bold font-prata">
            Dress for Every Story
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/collection?category=${cat.id}`} // 🔥 FIXED
              className="relative group overflow-hidden block"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-widest mb-1">
                  {cat.subtitle}
                </p>

                <h3 className="text-3xl font-bold mb-2">
                  {cat.label}
                </h3>

                <p className="text-sm opacity-80">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* ================= PROMO ================= */}

      <div className="bg-[#5A3E2B] text-white py-14 text-center">
        <p className="uppercase tracking-widest text-sm mb-3">
          Limited Time Offer
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-prata">
          Get 30% Off on Your First Purchase
        </h2>

        <Link
          to="/collection"
          className="bg-[#C6A27E] text-[#2C2C2C] px-8 py-3 font-semibold"
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
};

export default Hero;