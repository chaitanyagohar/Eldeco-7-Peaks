"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // <-- IMPORTED ROUTER
import {
  Home,
  IndianRupee,
  Map,
  LayoutDashboard,
  Image as ImageIcon,
  MapPin,
  PlaySquare,
  Download,
  Phone,
  FileText,
  Check,
  X,
  Headset,
  Car,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import Image from "next/image";

// ==========================================
// IMAGE LIGHTBOX COMPONENT
// ==========================================
interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition z-50"
      >
        <X size={32} />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 lg:left-6 text-white hover:text-gray-300 transition z-50 p-2 bg-black/40 rounded-full"
      >
        <ChevronLeft size={40} />
      </button>
      <img
        src={images[currentIndex]}
        alt="Preview"
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition duration-300 select-none"
      />
      <button
        onClick={onNext}
        className="absolute right-4 lg:right-6 text-white hover:text-gray-300 transition z-50 p-2 bg-black/40 rounded-full"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
}

// ==========================================
// NAVBAR COMPONENT
// ==========================================
function Navbar({ openModal }: { openModal: () => void }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "price",
        "floorplan",
        "amenities",
        "gallery",
        "location",
        "virtual",
      ];
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "", icon: Home, isHome: true },
    { id: "price", label: "Price", icon: IndianRupee },
    { id: "floorplan", label: "Site & Floor Plan", icon: Map },
    { id: "amenities", label: "Amenities", icon: LayoutDashboard },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "location", label: "Location", icon: MapPin },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50 flex items-center justify-between h-[70px] border-b border-gray-200">
        <div className="flex items-center h-full w-full lg:w-auto justify-between lg:justify-start px-4 lg:px-0">
          <div className="lg:px-6 lg:mr-2 flex items-center cursor-pointer h-full lg:border-r border-gray-200 min-w-[200px]">
            <img
              src="/logo.svg"
              alt="Eldeco 7 Peaks"
              className="h-10 lg:h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <h1 className="hidden text-xl font-bold text-gray-700 tracking-tighter leading-tight flex items-center">
              <span className="text-4xl text-[#a48e42] mr-1 font-serif">7</span>
              <div className="flex flex-col text-left">
                <span className="text-lg text-teal-900 tracking-wide">
                  PEAKS
                </span>
                <span className="text-[8px] tracking-[0.2em] text-gray-500 font-bold -mt-1">
                  RESIDENCES
                </span>
              </div>
            </h1>
          </div>

          <button
            className="lg:hidden text-gray-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={28} />
          </button>

          <div className="hidden xl:flex items-center h-full text-[14px] font-bold text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`flex items-center h-full transition-all duration-300 border-r border-gray-100 ${link.isHome ? "px-4" : "px-5"} ${activeSection === link.id ? "bg-[#126b5e] text-white shadow-inner" : "hover:text-[#126b5e] bg-white"}`}
              >
                <link.icon size={18} className={link.isHome ? "" : "mr-2"} />{" "}
                {link.label}
              </a>
            ))}
            <a
              href="#virtual"
              className={`flex items-center px-5 h-full transition-all duration-300 border-r border-gray-100 ${activeSection === "virtual" ? "bg-teal-800 text-white shadow-inner" : "bg-[#126b5e] text-white hover:bg-teal-800"}`}
            >
              <PlaySquare size={18} className="mr-2" /> Virtual Site Visit
            </a>
            <a
              href="#brochure"
              className="flex items-center px-5 h-full hover:text-teal-700 transition-colors group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              <Download
                size={18}
                className="mr-2 text-red-600 animate-float-dl group-hover:text-[#126b5e] transition-colors"
              />{" "}
              Download Brochure
            </a>
          </div>
        </div>

        <div className="hidden lg:flex h-full">
          <button
            onClick={openModal}
            className="flex items-center bg-[#4b4b4b] text-white px-6 h-full font-semibold hover:bg-gray-700 transition-colors text-sm text-left leading-tight border-r border-gray-600 group"
          >
            <div className="bg-red-100 p-1 rounded mr-2 group-hover:bg-red-200 transition-colors">
              <FileText size={20} className="text-red-600" />
            </div>
            <span>
              Download
              <br />
              Price Sheet
            </span>
          </button>
          <a
            href="tel:+919205303155"
            className="flex items-center bg-[#2d2d2d] text-white px-6 h-full font-bold text-lg hover:bg-black transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 animate-[pulse_2s_ease-in-out_infinite]"></div>
            <Phone size={20} className="mr-2 text-teal-400 animate-ring" />{" "}
            <span className="relative z-10 tracking-wide">+919205303155</span>
          </a>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[70px] left-0 w-full bg-white shadow-xl z-40 border-b border-gray-200 flex flex-col font-bold text-gray-700">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <link.icon size={18} className="mr-3 text-teal-700" />{" "}
              {link.label || "Home"}
            </a>
          ))}
          <a
            href="#virtual"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <PlaySquare size={18} className="mr-3 text-teal-700" /> Virtual Site
            Visit
          </a>
        </div>
      )}
    </>
  );
}

// ==========================================
// MAIN LANDING PAGE COMPONENT
// ==========================================
export default function EldecoLandingPage() {
  const router = useRouter(); // <-- INSTANTIATE ROUTER HERE

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAutoPopped, setHasAutoPopped] = useState(false); // Track if popup fired

  // Lightbox States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const amenitiesScrollRef = useRef<HTMLDivElement>(null);

  const heroImages = ["/hero1.jpeg", "/hero2.jpg", "/hero3.webp"];

  const amenitiesList = [
    { name: "CCTV SECURITY", img: "/ame1.webp" },
    { name: "GYMNASIUM", img: "/ame2.webp" },
    { name: "KIDS' PLAY AREA", img: "/ame3.webp" },
    { name: "CLUBHOUSE", img: "/ame4.webp" },
    { name: "INDOOR GAMES", img: "/ame5.webp" },
    { name: "LANDSCAPED GARDEN", img: "/ame6.webp" },
    { name: "SWIMMING POOL", img: "/ame7.webp" },
    { name: "YOGA ZONE", img: "/ame8.webp" },
    { name: "JOGGING TRACK", img: "/ame9.webp" },
    { name: "SENIOR CITIZEN AREA", img: "/ame10.webp" },
  ];

  const galleryImages = [
    "/gall1.webp",
    "/gall2.webp",
    "/gall3.webp",
    "/gall4.webp",
  ];

  // ==========================================
  // 5-SECOND AUTO POPUP LOGIC
  // ==========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoPopped) {
        setIsModalOpen(true);
        setHasAutoPopped(true);
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, [hasAutoPopped]);

  // Auto-advance Hero Slider
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length),
      4000,
    );
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Auto-advance Amenities Slider
  useEffect(() => {
    const timer = setInterval(() => {
      if (amenitiesScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          amenitiesScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          amenitiesScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          amenitiesScrollRef.current.scrollBy({
            left: 320,
            behavior: "smooth",
          });
        }
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Prevent scroll when Modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else if (!isLightboxOpen) document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isLightboxOpen]);

  // Lightbox Handlers
  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);
  const nextLightboxImage = () =>
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  const prevLightboxImage = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length,
    );

  const openModal = () => setIsModalOpen(true);
  const scrollAmenities = (direction: "left" | "right") => {
    if (amenitiesScrollRef.current) {
      amenitiesScrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  // ==========================================
  // NODEMAILER SUBMISSION HANDLER
  // ==========================================
  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      property: "Eldeco 7 Peaks Residences", // Context for your email
    };

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsModalOpen(false);
        // ROUTER REDIRECT TO THANK YOU PAGE
        router.push("/thank-you"); 
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactForm = () => (
    <div className="bg-white rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
      <h3 className="text-lg font-bold text-center text-gray-800 mb-6">
        Get The Best Quote
      </h3>
      <form className="space-y-5" onSubmit={handleLeadSubmit}>
        <input
          type="text"
          name="name" 
          placeholder="Name"
          className="w-full px-2 py-3 border-b border-gray-300 focus:outline-none focus:border-teal-700 bg-transparent text-sm transition-colors"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address (Optional)"
          className="w-full px-2 py-3 border-b border-gray-300 focus:outline-none focus:border-teal-700 bg-transparent text-sm transition-colors"
        />
        <div className="flex border-b border-gray-300 items-center">
          <select className="w-[30%] py-3 focus:outline-none bg-transparent text-gray-700 text-sm cursor-pointer">
            <option value="+91">India (+91)</option>
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-[70%] px-3 py-3 focus:outline-none bg-transparent text-sm"
            required
          />
        </div>
        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="animated-gradient text-white px-10 py-3 rounded font-bold shadow-[0_0_15px_rgba(27,91,80,0.4)] w-full transition-transform hover:scale-105 animate-cta-pop disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? "Sending..." : "Get It Now"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 relative scroll-smooth pb-16 lg:pb-0">
      {/* GLOBAL CSS STYLES WITH NEW CTA ANIMATION */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animated-gradient { background: linear-gradient(270deg, #1b5b50, #979e27, #1b5b50); background-size: 200% 200%; animation: gradientMove 3s ease infinite; color: white; border: none; }
        .animated-gradient-hover:hover { background: linear-gradient(270deg, #124038, #7a8020, #124038); background-size: 200% 200%; animation: gradientMove 2s ease infinite; }
        
        /* Attention Catching CTA Animation */
        @keyframes ctaPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-cta-pop {
          animation: ctaPop 2s ease-in-out infinite;
        }

        /* Utility classes */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
        @keyframes ring { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }
        .animate-ring { animation: ring 1.5s ease-in-out infinite; }
        @keyframes float-download { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .animate-float-dl { animation: float-download 2s ease-in-out infinite; }
      `,
        }}
      />

      <Navbar openModal={openModal} />

      {/* --- LIGHTBOX RENDER --- */}
      {isLightboxOpen && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextLightboxImage}
          onPrev={prevLightboxImage}
        />
      )}

      {/* Left Sticky Tab (Mobile) */}
      <div
        className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-l-0 border-gray-300 rounded-r shadow-lg cursor-pointer flex flex-col items-center py-4 px-1"
        onClick={openModal}
      >
        <div className="bg-red-600 rounded-full p-1.5 mb-2">
          <FileText size={14} className="text-white" />
        </div>
        <span className="text-gray-700 font-bold text-[10px] tracking-widest writing-vertical rotate-180">
          Brochure
        </span>
      </div>

      {/* Bottom Sticky Action Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 w-full bg-[#126b5e] text-white z-50 flex border-t border-teal-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a
          href="tel:+919205303155"
          className="flex-1 py-3 flex items-center justify-center font-bold text-[13px] border-r border-teal-700 hover:bg-teal-700"
        >
          <Phone size={16} className="mr-2" /> Call
        </a>
        <button
          onClick={openModal}
          className="flex-1 py-3 flex items-center justify-center font-bold text-[13px] border-r border-teal-700 hover:bg-teal-700"
        >
          <Download size={16} className="mr-2" /> Floor Plan
        </button>
        <button
          onClick={openModal}
          className="flex-1 py-3 flex items-center justify-center font-bold text-[13px] hover:bg-teal-700"
        >
          <FileText size={16} className="mr-2 text-red-300" /> Brochure
        </button>
      </div>

      {/* ========================================== */}
      {/* WHATSAPP FLOATING BUTTON */}
      {/* ========================================== */}
      <a
        href="https://wa.me/919205303155?text=Hi, I am interested in Eldeco 7 Peaks Residences."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[75px] lg:bottom-6 right-4 lg:right-6 z-50 bg-[#25D366] text-white p-3 lg:p-4 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 0C5.397 0 0 5.398 0 12.033C0 14.153 0.553 16.19 1.547 17.986L0.24 22.753L5.116 21.468C6.845 22.373 8.875 22.894 11.026 22.894C17.66 22.894 23.056 17.496 23.056 10.862C23.056 4.228 17.659 0 12.031 0ZM12.031 21.002C10.158 21.002 8.423 20.499 6.945 19.624L6.619 19.431L3.639 20.214L4.441 17.291L4.228 16.953C3.254 15.421 2.71 13.593 2.71 11.661C2.71 6.516 6.885 2.341 12.031 2.341C17.177 2.341 21.352 6.516 21.352 11.661C21.352 16.806 17.177 21.002 12.031 21.002ZM17.151 15.021C16.87 14.881 15.488 14.199 15.231 14.106C14.973 14.012 14.786 13.965 14.599 14.246C14.412 14.527 13.874 15.183 13.71 15.37C13.546 15.557 13.382 15.58 13.101 15.44C12.82 15.3 11.776 14.954 10.536 13.844C9.57 12.981 8.913 11.921 8.749 11.64C8.585 11.359 8.732 11.207 8.873 11.067C8.999 10.941 9.154 10.74 9.294 10.581C9.435 10.422 9.482 10.305 9.575 10.118C9.669 9.93 9.622 9.767 9.552 9.626C9.482 9.486 8.92 8.127 8.686 7.565C8.457 7.016 8.223 7.091 8.045 7.08C7.881 7.07 7.694 7.07 7.507 7.07C7.32 7.07 7.016 7.14 6.758 7.421C6.501 7.702 5.776 8.381 5.776 9.762C5.776 11.143 6.782 12.477 6.922 12.665C7.063 12.852 8.905 15.702 11.832 16.967C12.529 17.268 13.076 17.446 13.504 17.581C14.204 17.804 14.843 17.771 15.344 17.681C15.904 17.581 17.151 16.844 17.408 16.094C17.666 15.344 17.666 14.712 17.595 14.571C17.525 14.431 17.338 14.337 17.057 14.197H17.151Z" />
        </svg>
      </a>

      <div className="flex flex-col lg:flex-row mt-[70px] mx-auto bg-gray-50 border-x border-gray-200 shadow-sm max-w-[1500px]">
        <div className="w-full lg:w-[72%] lg:border-r border-gray-200 overflow-hidden">
          {/* Hero Section */}
          <section
            id="home"
            className="relative flex flex-col lg:flex-row lg:items-center lg:h-[550px] lg:p-8 bg-white lg:bg-transparent overflow-hidden"
          >
            <div className="relative w-full h-[320px] shrink-0 lg:absolute lg:inset-0 lg:h-full lg:w-full z-0">
              {heroImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentHeroSlide === idx ? "opacity-100" : "opacity-0"}`}
                  style={{ backgroundImage: `url('${img}')` }}
                />
              ))}
              <div className="absolute inset-0 bg-black/20 lg:bg-black/30"></div>

              <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroSlide(idx)}
                    className={`h-1.5 transition-all duration-300 rounded ${currentHeroSlide === idx ? "w-10 bg-white" : "w-10 bg-white/40 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white lg:max-w-sm w-full lg:rounded shadow-md lg:shadow-2xl relative z-10 border-t-4 border-teal-700 flex flex-col justify-center">
              <div className="bg-teal-700 text-white py-2 px-4 font-semibold text-sm text-center lg:text-left">
                Booking Open: Limited Time Only
              </div>
              <div className="p-4 lg:p-5">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 uppercase lg:capitalize">
                  Eldeco 7 Peaks Residences
                </h2>
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                  Sector 1A, Greater Noida
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  At Sector Omicron 1A, Greater Noida{" "}
                  <span className="font-semibold text-black">
                    By Eldeco Group
                  </span>
                </p>

                <div className="flex items-center text-sm mb-4">
                  <span className="bg-gray-50 p-1 border rounded mr-2">
                    <img
                      src="/Google__G__logo.svg.png"
                      alt="Google"
                      className="w-3 h-3"
                    />
                  </span>
                  <span className="text-yellow-400 flex mr-2 text-lg">
                    ★★★★★
                  </span>
                  <span className="font-bold mr-1">4.9</span>{" "}
                  <span className="text-gray-500 text-xs lg:text-sm">
                    Stars 50 Reviews
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 lg:gap-4 text-sm mb-4 bg-gray-50 p-2 rounded border border-gray-100">
                  <div>
                    <span className="text-gray-500 block text-[10px] lg:text-xs">
                      Land Parcel
                    </span>
                    <span className="font-bold text-gray-800 text-xs lg:text-sm">
                      7.5 Acres
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] lg:text-xs">
                      Possession
                    </span>
                    <span className="font-bold text-gray-800 text-xs lg:text-sm">
                      Nov 2030
                    </span>
                  </div>
                </div>

                <div className="animated-gradient p-2 lg:p-3 rounded mb-4 text-center text-[11px] lg:text-sm border-[2px] border-dashed border-white/50 shadow-inner">
                  <p className="font-bold mb-1 drop-shadow-md">
                    Instant Benefits On Spot-Booking
                  </p>
                  <p className="font-bold mb-1 drop-shadow-md">
                    Save Big On Early Buy Discounts
                  </p>
                  <p className="font-bold drop-shadow-md">
                    Flexipay For First 100 Customers
                  </p>
                </div>

                <p className="text-[11px] lg:text-xs text-gray-700 mb-1">
                  Luxurious{" "}
                  <span className="font-bold">3, 4 BHK & Penthouse</span> Starts
                  From
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  ₹ 2.16 Cr{" "}
                  <span className="text-xs lg:text-sm font-normal text-gray-500">
                    Onwards
                  </span>
                </p>

                {/* Animated Hero CTA */}
                <button
                  onClick={openModal}
                  className="w-full animated-gradient animated-gradient-hover font-bold py-2.5 lg:py-3 rounded transition shadow-[0_0_15px_rgba(27,91,80,0.5)] flex items-center justify-center text-sm lg:text-base animate-cta-pop"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </section>

          <section className="lg:hidden p-6 bg-gray-100 border-y border-gray-200"></section>

          {/* UPDATED WELCOME SECTION */}
          <section className="p-6 lg:p-10 bg-white border-b border-gray-100">
            <h2 className="text-2xl lg:text-3xl font-bold text-teal-800 mb-6">
              Welcome To Eldeco 7 Peaks Residences
            </h2>

            <div className="text-gray-600 leading-relaxed text-sm space-y-4 mb-8 text-justify">
              <p>
                Eldeco 7 Peaks Residences is an elegant residential enclave in
                Sector Omicron 1A, Greater Noida. This 7-tower-strong
                masterpiece offers luxurious 3 BHK and 4 BHK residences with
                beautiful panoramic views of the surrounding greenery from
                curved balconies. With all 4 sides of this project being open,
                every apartment enjoys abundant natural light and excellent
                ventilation. On top of that, each apartment is dressed with
                imported stone flooring and premium fittings. This project also
                presents a lavish 1,00,000 sq. ft. clubhouse along with top-tier
                amenities, including a clubhouse, landscaped garden, swimming
                pool, gymnasium, kids’ play area, multipurpose court, indoor
                games area, yoga zone, senior citizen area, and CCTV security.
              </p>
              <p>
                Situated in the bustling suburb of Greater Noida, Eldeco 7 Peaks
                Residences is merely minutes away from prominent landmarks like
                Millennium International School, Lotus World School, Harvard
                Learning School, KCC Institute of Technology & Management,
                Galgotias College of Engineering & Technology, Ivory Hospital,
                Kailash Hospital, Green City Hospital, Fortis Hospital, Wegmans
                Business Park, Stellar Business Park, Globus IT Park, The Grand
                Venice Mall, Omaxe Connaught Place Mall, MSX Mall, and Omicron
                Park. It is seamlessly connected to the city and beyond via Pari
                Chowk, the Yamuna Expressway, Noida-Greater Noida Expressway,
                Delta 1 Metro Station, and (upcoming) Noida International
                Airport. So, Eldeco 7 Peaks Residences, a gateway to a beautiful
                and serene life in Greater Noida, awaits as your next
                residential destination.
              </p>
            </div>

            {/* Animated Welcome CTA */}
            <button
              onClick={openModal}
              className="w-full md:w-auto animated-gradient text-white px-8 py-3.5 rounded-md font-bold flex justify-center items-center shadow-[0_0_15px_rgba(27,91,80,0.4)] hover:shadow-[0_0_20px_rgba(27,91,80,0.6)] transition-all duration-300 animate-cta-pop mx-auto lg:mx-0"
            >
              <Download size={18} className="mr-2" /> Download Brochure
            </button>
          </section>

          {/* Pricing Section */}
          <section
            id="price"
            className="p-6 lg:p-8 bg-white border-b border-gray-100"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-teal-800 mb-6">
              Eldeco 7 Peaks Residences Pricing And Saleable Area
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-200 min-w-[500px]">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="p-3 lg:p-4 border-b font-bold">Type</th>
                      <th className="p-3 lg:p-4 border-b font-bold">
                        Saleable Area
                      </th>
                      <th className="p-3 lg:p-4 border-b font-bold">Price</th>
                      <th className="p-3 lg:p-4 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        type: "3 BHK + 3T",
                        area: "1800 - 1850 SqFt",
                        price: "₹ 2.16 Cr Onwards",
                      },
                      {
                        type: "3 BHK + SQ",
                        area: "2100 - 2200 SqFt",
                        price: "₹ On Request",
                      },
                      {
                        type: "4 BHK + SQ",
                        area: "2600 - 2700 SqFt",
                        price: "₹ On Request",
                      },
                      {
                        type: "Duplex Penthouses",
                        area: "3500 - 5000 SqFt",
                        price: "₹ On Request",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 lg:p-4 font-semibold text-gray-800">
                          {row.type}
                        </td>
                        <td className="p-3 lg:p-4 text-gray-600">{row.area}</td>
                        <td className="p-3 lg:p-4 font-bold text-gray-800">
                          {row.price}
                        </td>
                        <td className="p-3 lg:p-4 text-right">
                          <button
                            onClick={openModal}
                            className="animated-gradient text-white px-3 py-1.5 rounded text-[11px] lg:text-xs font-bold shadow"
                          >
                            Price Breakup
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="w-full md:w-1/3 border border-gray-200 p-2 flex flex-col justify-center items-center rounded bg-white relative group cursor-pointer"
                onClick={openModal}
              >
                <img
                  src="/costing.jpg"
                  alt="Costing Details"
                  className="w-full blur-[2px] opacity-60 group-hover:blur-0 transition duration-300"
                />
                <button className="absolute animated-gradient text-white px-4 py-2 rounded font-bold shadow-lg text-xs lg:text-sm">
                  Download Costing Details
                </button>
              </div>
            </div>
          </section>

          {/* Master Plan */}
          <section
            id="floorplan"
            className="p-6 lg:p-8 bg-white border-b border-gray-100"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-teal-800 mb-6">
              Eldeco 7 Peaks Residences Master Plan
            </h2>
            <div
              className="flex justify-center group cursor-pointer"
              onClick={openModal}
            >
              <div className="w-full max-w-xl relative">
                <img
                  src="/masterplan.webp"
                  alt="Master Plan"
                  className="w-full border border-gray-200 shadow-sm"
                />
                <button className="w-full animated-gradient py-3 text-white font-bold rounded-b shadow-md text-sm lg:text-base">
                  Download Masterplan
                </button>
              </div>
            </div>
          </section>

          <section className="p-6 lg:p-8 bg-white border-b border-gray-100">
            <h2 className="text-xl lg:text-2xl font-bold text-teal-800 mb-6">
              Eldeco 7 Peaks Residences Floor Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "3 BHK + 3T 1800-1850 SqFt", img: "/3bhk+3t.webp" },
                { name: "3 BHK 2100-2200 SqFt", img: "/3bhk.webp" },
                { name: "4 BHK 2600-2700 SqFt", img: "/4bhk.webp" },
              ].map((plan, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded group relative overflow-hidden shadow-sm cursor-pointer"
                  onClick={openModal}
                >
                  <img
                    src={plan.img}
                    alt={plan.name}
                    className="w-full h-48 object-contain p-4 group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10">
                    <button className="bg-black/80 text-white px-6 py-2 border border-white/50 font-bold uppercase text-xs tracking-widest backdrop-blur-sm">
                      ENQUIRE NOW
                    </button>
                  </div>
                  <div className="animated-gradient text-white text-center py-2.5 font-bold flex items-center justify-center text-xs lg:text-sm relative z-20">
                    <Download size={16} className="mr-2" /> {plan.name}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities Section (Lightbox Integrated) */}
          <section
            id="amenities"
            className="p-6 lg:p-8 bg-white border-b border-gray-100 relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <h2 className="text-xl lg:text-2xl font-bold text-teal-800">
                Amenities Of Eldeco 7 Peaks Residences
              </h2>
              <button
                onClick={openModal}
                className="animated-gradient text-white px-4 py-2 rounded font-bold text-xs lg:text-sm shadow-md"
              >
                Download Amenities
              </button>
            </div>

            <div className="relative group">
              <button
                onClick={() => scrollAmenities("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md p-2 rounded-full text-teal-800 opacity-0 group-hover:opacity-100 transition hidden lg:block"
              >
                <ChevronLeft size={24} />
              </button>

              <div
                ref={amenitiesScrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
              >
                {amenitiesList.map((amenity, i) => (
                  <div
                    key={i}
                    className="relative h-48 lg:h-56 min-w-[260px] lg:min-w-[320px] rounded-lg overflow-hidden group/item cursor-pointer snap-start"
                    onClick={() =>
                      openLightbox(
                        amenitiesList.map((a) => a.img),
                        i,
                      )
                    }
                  >
                    <img
                      src={amenity.img}
                      alt={amenity.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover/item:opacity-100 transition-opacity"></div>
                    <span className="absolute bottom-4 left-4 text-white font-bold text-xs lg:text-sm tracking-wide">
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollAmenities("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md p-2 rounded-full text-teal-800 opacity-0 group-hover:opacity-100 transition hidden lg:block"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </section>

          {/* Gallery Section (Lightbox Integrated) */}
          <section
            id="gallery"
            className="p-6 lg:p-10 bg-white border-b border-gray-100"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-wide text-gray-800">
                Project Gallery
              </h2>
              <button
                onClick={openModal}
                className="animated-gradient text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-md hover:opacity-90 transition"
              >
                Download Gallery
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((src, index) => (
                <div
                  key={index}
                  className="group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition duration-300"
                  onClick={() => openLightbox(galleryImages, index)}
                >
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-28 lg:h-40 object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                  />
                </div>
              ))}
            </div>
          </section>

          <section
            id="location"
            className="p-6 lg:p-8 bg-white border-b border-gray-100"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <h2 className="text-xl lg:text-2xl font-bold text-teal-800">
                Location Map And Connectivity
              </h2>
              <button
                onClick={openModal}
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded font-bold text-xs lg:text-sm shadow-md"
              >
                Get Directions
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center">
              <div
                className="w-full md:w-[45%] cursor-pointer group"
                onClick={openModal}
              >
                <div className="border border-gray-200 p-1 rounded overflow-hidden">
                  <img
                    src="/locationmap.webp"
                    alt="Location Map"
                    className="w-full group-hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
              <div className="w-full md:w-[55%]">
                <ul className="space-y-4 font-semibold text-gray-800 text-xs lg:text-sm">
                  <li className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="flex items-center">
                      <MapPin size={16} className="text-teal-700 mr-2" /> Yamuna
                      Expressway
                    </span>{" "}
                    <span className="font-bold">5 mins</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="flex items-center">
                      <MapPin size={16} className="text-teal-700 mr-2" /> Delta
                      1 Metro Station
                    </span>{" "}
                    <span className="font-bold">12 mins</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="flex items-center">
                      <MapPin size={16} className="text-teal-700 mr-2" /> Noida
                      Int Airport (upcoming)
                    </span>{" "}
                    <span className="font-bold">45 mins</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="virtual"
            className="p-6 lg:p-8 bg-white border-b border-gray-100"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-teal-800 mb-6">
              Virtual Tour Request
            </h2>
            <div
              className="relative w-full h-48 lg:h-80 bg-gray-300 rounded overflow-hidden cursor-pointer group"
              onClick={openModal}
            >
              <img
                src="/hero3.webp"
                alt="Virtual Tour"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
                <div className="bg-white text-gray-800 rounded-full p-3 lg:p-4 mb-2 lg:mb-4 shadow-xl group-hover:scale-110 transition-transform">
                  <PlaySquare
                    size={28}
                    className="pl-1 lg:w-[36px] lg:h-[36px]"
                  />
                </div>
                <h3 className="text-white text-xl lg:text-3xl font-bold uppercase tracking-widest drop-shadow-md">
                  Virtual Site Visit
                </h3>
              </div>
            </div>
          </section>

          <footer className="p-6 lg:p-8 bg-white text-xs lg:text-sm text-gray-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
              <h3 className="font-bold text-lg lg:text-xl text-teal-800">
                About Eldeco Group
              </h3>
              <button
                onClick={openModal}
                className="animated-gradient text-white px-5 py-2 rounded font-bold shadow-md"
              >
                Chat with us
              </button>
            </div>

            <p className="mb-6 lg:mb-8 leading-relaxed text-gray-600 text-justify">
              Incorporated in 1985, Eldeco Group has been at the forefront of
              Real Estate development in North India since. So far, they have
              delivered 200 outstanding projects spanning integrated townships,
              high-rise condominiums, commercial & industrial estates, and
              malls.
            </p>

            <h4 className="font-bold text-gray-900 mb-2">RERA Information</h4>
            <p className="mb-4 lg:mb-6 font-semibold">
              RERA No : UPRERAPRJ106523/01/2026
            </p>

            <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
              <li className="flex items-start text-[10px] lg:text-xs">
                <Check
                  size={12}
                  className="text-teal-600 mr-2 mt-0.5 flex-shrink-0"
                />{" "}
                Project Registered under Government of India RERA Act 2016
              </li>
              <li className="flex items-start text-[10px] lg:text-xs">
                <Check
                  size={12}
                  className="text-teal-600 mr-2 mt-0.5 flex-shrink-0"
                />{" "}
                Site Address: Eldeco 7 Peaks Residences: Plot GH-01 & GH-01A,
                Block A, Sector Omicron-1A, Greater Noida
              </li>
            </ul>

            <div className="border-t border-gray-200 pt-6 text-center text-[10px] lg:text-xs text-gray-500">
              <p className="mb-2">
                Disclaimer: We are an authorised marketing partner for this
                project. Provided content is given by respective owners and this
                website and content is for information purpose only...
              </p>
              <p>
                Copyright © 2026 | Terms & Conditions | Privacy Policy | Cookies
                Policy
              </p>
            </div>
          </footer>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN (WHERE THE FORM NOW LIVES!) */}
        {/* ========================================== */}
        <div className="hidden lg:block lg:w-[28%] bg-gray-50 relative">
          <div className="sticky top-16 p-6 pt-8 bg-white h-[calc(100vh-64px)] overflow-y-auto border-l border-gray-200">
            
            <ContactForm />

            <div className="mt-8 border-t border-gray-100 pt-8">
              <a href="tel:+919205303155">
                <button className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3.5 rounded mb-8 flex items-center justify-center shadow-md transition-colors">
                  <Phone size={18} className="mr-2" />
                  Instant Call Back
                </button>
              </a>

              <div
                className="border rounded-full p-2 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition group"
                onClick={openModal}
              >
                <div className="flex items-center px-4">
                  <span className="text-sm font-bold text-gray-700 text-right leading-tight mr-3 group-hover:text-teal-700 transition">
                    Download
                    <br />
                    Brochure
                  </span>
                  <div className="bg-red-600 text-white p-3 rounded-full shadow">
                    <FileText size={18} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- FORM MODAL RENDER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-xl flex flex-col overflow-hidden relative shadow-2xl w-full max-w-[700px] animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10 bg-gray-100 rounded-full p-1"
            >
              <X size={20} strokeWidth={3} />
            </button>

            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-[35%] bg-gray-50 p-6 lg:p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex items-center mb-6 lg:mb-8">
                  <Image
                    src="/logo.svg"
                    alt="7 Peaks Residences"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-teal-700 mb-6 w-full text-center">
                  We Promise
                </h2>
                <div className="space-y-4 lg:space-y-6 w-full px-2 flex md:flex-col justify-around md:justify-start">
                  <div className="flex flex-col md:flex-row items-center md:items-start text-teal-700 font-semibold text-[10px] md:text-sm text-center md:text-left">
                    <div className="w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-0 md:mr-3 flex items-center justify-center bg-teal-50 rounded-full border border-teal-100">
                      <Headset
                        className="w-4 h-4 md:w-5 md:h-5"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="hidden md:inline">
                      Instant Call
                      <br />
                      Back
                    </span>
                    <span className="md:hidden">
                      Instant
                      <br />
                      Call
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:items-start text-teal-700 font-semibold text-[10px] md:text-sm text-center md:text-left">
                    <div className="w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-0 md:mr-3 flex items-center justify-center bg-teal-50 rounded-full border border-teal-100">
                      <Car className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                    </div>
                    <span className="hidden md:inline">
                      Free Site
                      <br />
                      Visit
                    </span>
                    <span className="md:hidden">
                      Free
                      <br />
                      Visit
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:items-start text-teal-700 font-semibold text-[10px] md:text-sm text-center md:text-left">
                    <div className="w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-0 md:mr-3 flex items-center justify-center bg-teal-50 rounded-full border border-teal-100">
                      <ShieldCheck
                        className="w-4 h-4 md:w-5 md:h-5"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="hidden md:inline">
                      Unmatched
                      <br />
                      Price
                    </span>
                    <span className="md:hidden">
                      Best
                      <br />
                      Price
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[65%] p-6 lg:p-10 bg-white">
                <h3 className="text-sm lg:text-[17px] font-bold text-gray-800 mb-6 lg:mb-8 border-b pb-2 text-center md:text-left">
                  Register Here And Avail The{" "}
                  <span className="text-red-500">Best Offers!!</span>
                </h3>
                {/* Notice we attached the same handleLeadSubmit here! */}
                <form
                  className="space-y-4 lg:space-y-6"
                  onSubmit={handleLeadSubmit}
                >
                  <input
                    type="text"
                    name="name" 
                    placeholder="Name"
                    className="w-full px-1 py-2 border-b border-gray-300 text-gray-700 focus:outline-none focus:border-teal-700 text-sm"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address(Optional)"
                    className="w-full px-1 py-2 border-b border-gray-300 text-gray-700 focus:outline-none focus:border-teal-700 text-sm"
                  />
                  <div className="flex border-b border-gray-300 items-center">
                    <select className="w-[35%] py-2 focus:outline-none bg-transparent text-gray-700 font-medium text-sm">
                      <option value="+91">India (+91)</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      className="w-[65%] px-3 py-2 focus:outline-none text-gray-700 text-sm"
                      required
                    />
                  </div>
                  <div className="pt-2 lg:pt-4 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-8 rounded-md shadow-md w-full md:w-3/4 text-sm transition-transform active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Get Instant Call Back"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <a href="tel:+919205303155">
            <div className="w-full bg-teal-700 py-3 flex items-center justify-center text-white font-bold tracking-wide text-sm lg:text-base">
              <Phone size={16} className="mr-2" /> +919205303155
            </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}