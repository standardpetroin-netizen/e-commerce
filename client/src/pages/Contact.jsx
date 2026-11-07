import React, { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const formRef = useRef(null);
  const successRef = useRef(null);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9\s\-\+\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "general",
        message: "",
      });

      // Scroll to success message
      if (successRef.current) {
        successRef.current.scrollIntoView({ behavior: "smooth" });
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      content: "123 Fashion Street, New York, NY 10001",
      secondary: "We're located in the heart of Manhattan",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+1 (800) 123-4567",
      secondary: "Mon - Fri, 9:00 AM - 6:00 PM EST",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "support@forever.com",
      secondary: "We reply within 24 hours",
    },
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "order", label: "Order Status" },
    { value: "returns", label: "Returns & Exchanges" },
    { value: "product", label: "Product Information" },
    { value: "partnership", label: "Partnership Opportunities" },
    { value: "feedback", label: "Feedback" },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative pt-16 pb-24 px-4 md:px-0 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-black/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-black" />
              <p className="font-semibold text-xs md:text-sm tracking-widest uppercase">
                GET IN TOUCH
              </p>
              <div className="w-12 h-[2px] bg-black" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              We'd Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Hear From You</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our collections? Need help with an order? Our team is here to assist you with anything you need.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>

                  <h3 className="text-xl font-bold text-black mb-2">
                    {info.title}
                  </h3>

                  <p className="text-lg font-semibold text-black mb-2">
                    {info.content}
                  </p>

                  <p className="text-sm text-gray-600">
                    {info.secondary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* LEFT - Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-200 shadow-xl">
              
              {/* Form Header */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-black mb-3 group-focus-within:text-gray-700 transition-colors">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-black focus:bg-white hover:border-gray-400"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-black mb-3 group-focus-within:text-gray-700 transition-colors">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-black focus:bg-white hover:border-gray-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-black mb-3 group-focus-within:text-gray-700 transition-colors">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-black focus:bg-white hover:border-gray-400"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-black mb-3 group-focus-within:text-gray-700 transition-colors">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      errors.subject
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-black focus:bg-white hover:border-gray-400"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Category Select */}
                <div className="group">
                  <label className="block text-sm font-semibold text-black mb-3 group-focus-within:text-gray-700 transition-colors">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-black focus:bg-white hover:border-gray-400 transition-all duration-300 focus:outline-none bg-white text-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5em 1.5em",
                      paddingRight: "2.5rem",
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-black mb-3 group-focus-within:text-gray-700 transition-colors">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                      errors.message
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:border-black focus:bg-white hover:border-gray-400"
                    }`}
                  />
                  <div className="flex justify-between mt-2">
                    {errors.message && (
                      <p className="text-red-600 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 ml-auto">
                      {formData.message.length} characters
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-900 disabled:bg-gray-400 transition-all duration-300 flex items-center justify-center gap-3 group hover:gap-4 mt-8"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Form Note */}
                <p className="text-xs text-gray-500 text-center mt-6">
                  We respect your privacy. Your information will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT - Info & FAQ */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Operating Hours */}
            <div className="bg-gradient-to-br from-black to-gray-900 text-white rounded-3xl p-8 border-2 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Operating Hours</h3>

              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <p className="font-semibold">Monday - Friday</p>
                  <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                </div>

                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <p className="font-semibold">Saturday</p>
                  <p className="text-gray-300">10:00 AM - 4:00 PM</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold">Sunday</p>
                  <p className="text-gray-300">Closed</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-xl">
                <p className="text-sm text-gray-200">
                  💡 <span className="font-semibold">Pro Tip:</span> Email us anytime and we'll respond within 24 hours, even outside business hours.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-6">Quick Answers</h3>

              <div className="space-y-4">
                <details className="group cursor-pointer">
                  <summary className="font-semibold text-black flex justify-between items-center py-3 px-4 hover:bg-gray-100 rounded-xl transition-colors">
                    <span>How long does shipping take?</span>
                    <span className="group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-gray-600 px-4 pb-3">
                    Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
                  </p>
                </details>

                <details className="group cursor-pointer">
                  <summary className="font-semibold text-black flex justify-between items-center py-3 px-4 hover:bg-gray-100 rounded-xl transition-colors">
                    <span>What's your return policy?</span>
                    <span className="group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-gray-600 px-4 pb-3">
                    We offer 30-day returns on all items in original condition with tags attached. Free return shipping available.
                  </p>
                </details>

                <details className="group cursor-pointer">
                  <summary className="font-semibold text-black flex justify-between items-center py-3 px-4 hover:bg-gray-100 rounded-xl transition-colors">
                    <span>Do you ship internationally?</span>
                    <span className="group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-gray-600 px-4 pb-3">
                    Yes! We ship to over 150 countries. International shipping rates vary by location.
                  </p>
                </details>

                <details className="group cursor-pointer">
                  <summary className="font-semibold text-black flex justify-between items-center py-3 px-4 hover:bg-gray-100 rounded-xl transition-colors">
                    <span>How do I track my order?</span>
                    <span className="group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-gray-600 px-4 pb-3">
                    You'll receive a tracking number via email once your order ships. Check your order status in your account.
                  </p>
                </details>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8 border-2 border-gray-300">
              <h3 className="text-xl font-bold text-black mb-3">Stay Updated</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Subscribe to get exclusive offers and fashion tips.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-black focus:outline-none mb-3 transition-colors"
              />
              <button className="w-full bg-black text-white py-3 rounded-xl font-bold uppercase text-sm hover:bg-gray-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <div
          ref={successRef}
          className="fixed bottom-8 right-8 max-w-md bg-white rounded-2xl shadow-2xl border-2 border-black p-6 animate-slide-up"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>

            <div>
              <h4 className="font-bold text-black mb-1">Message Sent!</h4>
              <p className="text-sm text-gray-600">
                Thanks for contacting us. We'll get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM STYLES */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        textarea::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
};

export default Contact;