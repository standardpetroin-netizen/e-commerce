import React from "react";

const OurPolicy = () => {
  const policies = [
    {
      title: "Premium Quality",
      description:
        "Every product is crafted using high-quality fabrics and strict quality control to ensure durability, comfort, and timeless style.",
      icon: "✦",
    },
    {
      title: "Free Shipping",
      description:
        "Enjoy complimentary shipping on all orders above ₹999 with fast, reliable delivery across the country.",
      icon: "🚚",
    },
    {
      title: "Easy Returns",
      description:
        "Not satisfied? Return or exchange within 7 days with our seamless and hassle-free return process.",
      icon: "↺",
    },
    {
      title: "Secure Payments",
      description:
        "All transactions are protected with advanced encryption ensuring safe and secure checkout every time.",
      icon: "🔒",
    },
  ];

  return (
    <section className="bg-[#f5efe7] py-20 px-6">
      
      {/* ===== Heading ===== */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8b6f47] mb-3">
          Why Choose Us
        </p>

        <h2 className="text-3xl md:text-5xl font-semibold text-[#3e2f1c]">
          Our Commitment to You
        </h2>

        <p className="mt-5 text-[#6b5a45] leading-relaxed">
          We combine premium craftsmanship with reliable service to deliver
          fashion that feels luxurious, accessible, and dependable.
        </p>
      </div>

      {/* ===== Policies Grid ===== */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="
              group
              bg-[#fffaf5]
              p-8
              rounded-2xl
              shadow-md
              border border-[#eadfce]
              hover:shadow-xl
              hover:-translate-y-2
              transition-all duration-300
              relative overflow-hidden
            "
          >
            {/* Subtle premium glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#e7d7c2]/40 opacity-0 group-hover:opacity-100 transition" />

            {/* Icon */}
            <div className="text-3xl mb-5 text-[#8b6f47]">
              {policy.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[#3e2f1c] mb-3">
              {policy.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#6b5a45] leading-relaxed">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;