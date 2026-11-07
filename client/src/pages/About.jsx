import React, { useState, useEffect } from "react";
import { Heart, Award, Users, Globe, TrendingUp, Zap } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Quality First",
      description: "We believe in crafting garments that stand the test of time. Every piece is carefully selected and inspected for excellence.",
      color: "from-red-500/20 to-pink-500/20",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Sustainability",
      description: "Our commitment to the planet means using eco-friendly materials and ethical production practices across all our collections.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "We constantly push boundaries to bring you the latest trends while maintaining timeless style and comfort.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Customer Passion",
      description: "Your satisfaction drives everything we do. We listen, adapt, and continuously improve to exceed your expectations.",
      color: "from-yellow-500/20 to-orange-500/20",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Creative Director",
      image: "👨‍💼"
,
      bio: "15+ years in fashion design with a vision to make luxury accessible.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "👨‍💼",
      bio: "Expert in supply chain management and sustainable practices.",
    },
    {
      name: "Emma Williams",
      role: "Lead Designer",
      image: "👩‍🎨",
      bio: "Award-winning designer known for innovative and bold collections.",
    },
    {
      name: "David Martinez",
      role: "Customer Experience Manager",
      image: "👨‍💼",
      bio: "Passionate about building lasting relationships with our customers.",
    },
  ];

  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description: "Founded Forever in a small boutique in New York with a vision to revolutionize fashion.",
    },
    {
      year: "2014",
      title: "First Expansion",
      description: "Opened flagship stores in Los Angeles and Miami. Launched online shopping platform.",
    },
    {
      year: "2017",
      title: "Going Global",
      description: "Expanded to Europe and Asia. Introduced sustainable collection.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched mobile app. Pioneered virtual try-on technology.",
    },
    {
      year: "2023",
      title: "Sustainability Leader",
      description: "Achieved carbon-neutral operations. 100% ethical sourcing across all collections.",
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Expanding AI-powered personalization and launching metaverse fashion.",
    },
  ];

  const stats = [
    { number: "50M+", label: "Happy Customers Worldwide" },
    { number: "150+", label: "Countries & Regions" },
    { number: "500+", label: "Physical & Digital Stores" },
    { number: "100%", label: "Ethical & Sustainable" },
  ];

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative min-h-screen pt-20 pb-20 px-4 md:px-0 flex items-center overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT - Text */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-black" />
                <p className="font-semibold text-xs md:text-sm tracking-widest uppercase">
                  Our Story
                </p>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Fashion That <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Tells Your Story</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                Since 2010, Forever has been at the forefront of fashion innovation, creating beautiful garments that inspire confidence and express individuality. We believe that fashion is more than just clothing—it's a form of self-expression and art.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-4 rounded-xl font-bold uppercase text-sm hover:bg-gray-900 transition-all hover:scale-105 duration-300">
                  Explore Collections
                </button>
                <button className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold uppercase text-sm hover:bg-black hover:text-white transition-all duration-300">
                  Watch Our Story
                </button>
              </div>
            </div>

            {/* RIGHT - Visual */}
            <div className="relative h-96 md:h-full min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <div className="text-6xl md:text-8xl animate-float">👗</div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-200 animate-slide-up max-w-xs hidden md:block">
                <p className="text-sm font-semibold text-gray-600 mb-2">FOUNDED</p>
                <p className="text-4xl font-bold text-black">2010</p>
                <p className="text-xs text-gray-500 mt-2">Over 14 years of excellence</p>
              </div>

              <div className="absolute -top-8 -right-8 bg-black text-white rounded-2xl p-6 shadow-2xl border-2 border-gray-800 animate-slide-up max-w-xs hidden md:block" style={{ animationDelay: "0.1s" }}>
                <p className="text-sm font-semibold text-gray-300 mb-2">CUSTOMERS</p>
                <p className="text-4xl font-bold">50M+</p>
                <p className="text-xs text-gray-400 mt-2">Trust us worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="py-20 px-4 md:px-0 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center observe"
                id={`stat-${index}`}
              >
                <p className={`text-4xl md:text-5xl font-bold mb-3 transition-all duration-1000 ${
                  isVisible[`stat-${index}`]
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}>
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION & VISION SECTION */}
      <div className="py-24 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="observe" id="mission">
              <div className={`transition-all duration-1000 ${
                isVisible["mission"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-black" />
                  <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To democratize fashion by providing high-quality, sustainable, and stylish clothing that empowers individuals to express their unique identity and build confidence.
                </p>

                <ul className="space-y-4">
                  {[
                    "Create timeless pieces that transcend trends",
                    "Maintain ethical and sustainable practices",
                    "Build a community of fashion enthusiasts",
                    "Make luxury accessible to everyone",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">
                        ✓
                      </span>
                      <p className="text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="observe" id="vision">
              <div className={`transition-all duration-1000 delay-200 ${
                isVisible["vision"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-black" />
                  <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To become the world's most trusted fashion brand, known for our commitment to quality, sustainability, and customer-centricity. We envision a future where fashion and ethics go hand in hand.
                </p>

                <ul className="space-y-4">
                  {[
                    "Lead the industry in sustainable fashion",
                    "Achieve global presence in 200+ countries",
                    "Innovate through technology and design",
                    "Create positive social impact",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">
                        ✓
                      </span>
                      <p className="text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="py-24 px-4 md:px-0 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 observe" id="values-header">
            <div className={`transition-all duration-1000 ${
              isVisible["values-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-black" />
                <p className="font-semibold text-xs md:text-sm tracking-widest uppercase">
                  Core Values
                </p>
                <div className="w-12 h-[2px] bg-black" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Drives Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our values guide every decision we make, from design to customer service.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="observe group cursor-pointer"
                id={`value-${index}`}
                onClick={() => setActiveValue(index)}
              >
                <div className={`transition-all duration-1000 ${
                  isVisible[`value-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    activeValue === index ? "ring-2 ring-black" : ""
                  }`}>
                    <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white">{value.icon.props.children}</span>
                      {value.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-black mb-3">
                      {value.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <div className="py-24 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 observe" id="timeline-header">
            <div className={`transition-all duration-1000 ${
              isVisible["timeline-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-black" />
                <p className="font-semibold text-xs md:text-sm tracking-widest uppercase">
                  Our Journey
                </p>
                <div className="w-12 h-[2px] bg-black" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold">
                A Timeline of Excellence
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-black to-gray-300" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="observe"
                  id={`timeline-${index}`}
                >
                  <div className={`transition-all duration-1000 ${
                    isVisible[`timeline-${index}`]
                      ? "opacity-100"
                      : "opacity-0"
                  }`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className={`md:grid md:grid-cols-2 md:gap-12 items-center ${
                      index % 2 === 1 ? "md:grid-flow-dense" : ""
                    }`}>
                      {/* Dot */}
                      <div className="hidden md:flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-black border-4 border-white shadow-lg" />
                      </div>

                      {/* Content */}
                      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-300 hover:border-black transition-all duration-300 hover:shadow-xl ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="md:hidden w-4 h-4 rounded-full bg-black flex-shrink-0" />
                          <p className="text-2xl font-bold text-black">
                            {item.year}
                          </p>
                        </div>

                        <h3 className="text-2xl font-bold text-black mb-3">
                          {item.title}
                        </h3>

                        <p className="text-gray-700">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="py-24 px-4 md:px-0 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 observe" id="team-header">
            <div className={`transition-all duration-1000 ${
              isVisible["team-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-white" />
                <p className="font-semibold text-xs md:text-sm tracking-widest uppercase">
                  Our People
                </p>
                <div className="w-12 h-[2px] bg-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet the Team Behind Forever
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Talented individuals dedicated to bringing fashion excellence to the world.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="observe group cursor-pointer"
                id={`team-${index}`}
              >
                <div className={`transition-all duration-1000 ${
                  isVisible[`team-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border-2 border-gray-800 hover:border-white transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <div className="text-7xl mb-6 group-hover:scale-125 transition-transform duration-300">
                      {member.image}
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {member.name}
                    </h3>

                    <p className="text-sm text-orange-400 font-semibold mb-4">
                      {member.role}
                    </p>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-24 px-4 md:px-0">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-black to-gray-900 rounded-3xl p-12 md:p-20 text-white text-center observe" id="cta">
          <div className={`transition-all duration-1000 ${
            isVisible["cta"]
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the Forever Community
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Be part of a fashion movement that values quality, sustainability, and self-expression. Discover your style today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-bold uppercase text-sm hover:bg-gray-100 transition-all hover:scale-105 duration-300">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold uppercase text-sm hover:bg-white hover:text-black transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default About;