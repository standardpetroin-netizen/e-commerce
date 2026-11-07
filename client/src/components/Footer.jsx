import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#1a1410] text-[#e7ded6] pt-16 pb-8 px-6 border-t border-[#3a2e26]">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <img src={logo} alt="Logo" className="w-36 mb-6 brightness-110" />

          <p className="text-sm leading-relaxed text-[#cbbfb6]">
            Timeless fashion crafted for everyone — men, women, and kids.
            Premium quality clothing designed to combine comfort,
            affordability, and modern elegance.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {["facebook", "instagram", "twitter"].map((item) => (
              <div
                key={item}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2b221c] hover:bg-[#b08968] hover:text-black transition cursor-pointer"
              >
                <span className="text-sm font-semibold">
                  {item.charAt(0).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#f3ebe5]">
            Company
          </h3>

          <ul className="space-y-3 text-sm text-[#cbbfb6]">
            {["About Us", "Careers", "Blog", "Contact"].map((link) => (
              <li
                key={link}
                className="hover:text-[#e6c7a8] transition cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#f3ebe5]">
            Customer Service
          </h3>

          <ul className="space-y-3 text-sm text-[#cbbfb6]">
            {[
              "Shipping Policy",
              "Return Policy",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((link) => (
              <li
                key={link}
                className="hover:text-[#e6c7a8] transition cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#f3ebe5]">
            Stay Updated
          </h3>

          <p className="text-sm text-[#cbbfb6] mb-4">
            Subscribe for exclusive offers, new arrivals, and style tips.
          </p>

          {/* Email Input */}
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 bg-[#2b221c] border border-[#3a2e26] text-sm rounded-l-md focus:outline-none focus:border-[#b08968]"
            />

            <button className="px-5 bg-[#b08968] text-black font-semibold rounded-r-md hover:bg-[#d4a373] transition">
              Subscribe
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-sm text-[#cbbfb6] space-y-2">
            <p>Huzurganj, Madhya Pradesh</p>
            <p>+91 98765 43210</p>
            <p>support@yourstore.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3a2e26] mt-14 pt-6 text-center text-sm text-[#a89f98]">
        © {new Date().getFullYear()} Your Store. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;