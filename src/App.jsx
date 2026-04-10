import { useState, useEffect } from "react";
import { texts } from "./locales";
import "./App.css";
import masonryImg from "./assets/services/masonry.jpg";
import paintingImg from "./assets/services/painting.jpg";
import plumbingImg from "./assets/services/plumbing.jpg";
import waterproofingImg from "./assets/services/waterproofing.jpg";
import ironworkImg from "./assets/services/ironwork.jpg";
import remodelingImg from "./assets/services/remodeling.jpg";
import electricityImg from "./assets/services/electricity.jpg";
import drywallImg from "./assets/services/drywall.jpg";
import flooringImg from "./assets/services/flooring.jpg";
import uneImg from "./assets/partnerships/une.png";
import torreVenturaImg from "./assets/partnerships/torre-ventura.jpeg";
import puntoSurImg from "./assets/partnerships/punto-sur.jpeg";
import vibrantaImg from "./assets/partnerships/vibranta.jpeg";
import espacioMinervaImg from "./assets/partnerships/espacio-minerva.jpeg";
import topImg from "./assets/gallery/top.jpg";
import imperImg from "./assets/gallery/impermeabilizacion.jpg";
import pintExt from "./assets/gallery/pint-ext.jpg";
import pisoImg from "./assets/gallery/piso.jpg";
import tablarocaImg from "./assets/gallery/tablaroca.jpg";
import tablarocaImg2 from "./assets/gallery/tablaroca2.jpg";
import tablarocaImg3 from "./assets/gallery/tablaroca3.jpg";
import bañoImg from "./assets/gallery/baño.jpg";

// IMPORTANTE: Define la base path según tu repositorio
const BASE_PATH = "/robertomedina";

// Logo SVG (puedes reemplazar con tu propio logo)
const LogoIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="url(#gradient)" />
    <path
      d="M10 12L16 8L22 12V20L16 24L10 20V12Z"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M16 12V16M16 16L19 14M16 16L13 14"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="16" cy="17" r="1" fill="white" />
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="32"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
  </svg>
);

const galleryImages = [
  {
    id: 1,
    src: topImg,
    title: "Techo",
    category: "Remodelación",
  },
  {
    id: 2,
    src: imperImg,
    title: "Impermeabilización de azotea",
    category: "Impermeabilización",
  },
  {
    id: 3,
    src: pintExt,
    title: "Pintura exterior",
    category: "Pintura",
  },
  {
    id: 4,
    src: pisoImg,
    title: "Instalación de piso",
    category: "Pisos",
  },
  {
    id: 5,
    src: tablarocaImg,
    title: "Tablaroca",
    category: "Tablaroca",
  },
  {
    id: 6,
    src: tablarocaImg2,
    title: "Pared de tablaroca",
    category: "Tablaroca",
  },
  {
    id: 7,
    src: tablarocaImg3,
    title: "Tablaroca ducto",
    category: "Tablaroca",
  },
  {
    id: 8,
    src: bañoImg,
    title: "remodelación de baño",
    category: "Albañilería",
  },
];

function App() {
  const [language, setLanguage] = useState("es");
  const [selectedImage, setSelectedImage] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const t = texts[language];

  // Función para cambiar idioma
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("preferred_language", newLang);

    const url = new URL(window.location);
    url.searchParams.set("lang", newLang);
    window.history.pushState({}, "", url);
  };

  // Detectar idioma al cargar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get("lang");

    if (langFromUrl === "en" || langFromUrl === "es") {
      setLanguage(langFromUrl);
      localStorage.setItem("preferred_language", langFromUrl);
      return;
    }

    const savedLang = localStorage.getItem("preferred_language");
    if (savedLang === "en" || savedLang === "es") {
      setLanguage(savedLang);
      const url = new URL(window.location);
      url.searchParams.set("lang", savedLang);
      window.history.replaceState({}, "", url);
      return;
    }

    setLanguage("es");
    localStorage.setItem("preferred_language", "es");
    const url = new URL(window.location);
    url.searchParams.set("lang", "es");
    window.history.replaceState({}, "", url);
  }, []);

  // Efecto parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleWhatsApp = () => {
    const phoneNumber = "3327466072";
    const message =
      language === "es"
        ? "Hola Roberto, me interesa tu servicio. ¿Podemos conversar?"
        : "Hello Roberto, I'm interested in your service. Can we talk?";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const serviceImages = {
    masonry: masonryImg,
    painting: paintingImg,
    plumbing: plumbingImg,
    waterproofing: waterproofingImg,
    ironwork: ironworkImg,
    remodeling: remodelingImg,
    electricity: electricityImg,
    drywall: drywallImg,
    flooring: flooringImg,
  };

  const partnershipImages = {
    une: uneImg,
    torreVentura: torreVenturaImg,
    puntoSur: puntoSurImg,
    vibranta: vibrantaImg,
    espacioMinerva: espacioMinervaImg,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar con logo y tipografía mejorada */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <div>
                <h1
                  className="text-xl font-bold text-gray-800 logo-text"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.name}
                </h1>
                <p
                  className="text-xs text-gray-500 hidden sm:block subtitle"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t.title}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "services")}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t.nav.services}
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "gallery")}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t.nav.gallery}
              </a>
              <a
                href="#partnerships"
                onClick={(e) => handleNavClick(e, "partnerships")}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t.nav.partnerships}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${language === "es" ? "font-semibold text-gray-900" : "text-gray-400"}`}
              >
                ES
              </span>
              <button
                onClick={() => changeLanguage(language === "es" ? "en" : "es")}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                style={{
                  backgroundColor: language === "es" ? "#3b82f6" : "#9ca3af",
                }}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                    language === "en" ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${language === "en" ? "font-semibold text-gray-900" : "text-gray-400"}`}
              >
                EN
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section con Parallax e Imagen de fondo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con efecto parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${offsetY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${BASE_PATH}/hero-bg.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
            }}
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-gray-900/70" />
        </div>

        {/* Contenido del hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Imagen de perfil/logo adicional (opcional) */}
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl">
              <div className="bg-white rounded-full p-2">
                <img
                  src={`${BASE_PATH}/perfil.jpg`}
                  alt="Roberto Medina"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                  onError={(e) => {
                    e.target.src = `${BASE_PATH}/default-profile.jpg`;
                    e.target.onerror = null;
                  }}
                />
              </div>
            </div>
          </div>

          <h2
            className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {t.hero.greeting} <span className="text-blue-300">{t.name}</span>
          </h2>

          <p
            className="subtitle text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.032 2.016c4.939 0 8.953 4.014 8.953 8.953 0 4.94-4.014 8.953-8.953 8.953-1.616 0-3.128-.432-4.454-1.191l-4.966 1.322 1.354-4.776c-.871-1.367-1.373-2.96-1.373-4.672 0-4.94 4.014-8.953 8.953-8.953z" />
              </svg>
              {t.contact.button}
            </button>

            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/30"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Ver Servicios ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Servicios con tipografía mejorada */}
      <section id="services" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.services.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                imageKey: "masonry",
                name: t.services.masonry,
                desc: t.services.masonryDesc,
              },
              {
                imageKey: "painting",
                name: t.services.painting,
                desc: t.services.paintingDesc,
              },
              {
                imageKey: "plumbing",
                name: t.services.plumbing,
                desc: t.services.plumbingDesc,
              },
              {
                imageKey: "waterproofing",
                name: t.services.waterproofing,
                desc: t.services.waterproofingDesc,
              },
              {
                imageKey: "ironwork",
                name: t.services.ironwork,
                desc: t.services.ironworkDesc,
              },
              {
                imageKey: "remodeling",
                name: t.services.remodeling,
                desc: t.services.remodelingDesc,
              },
              {
                imageKey: "electricity",
                name: t.services.electricity,
                desc: t.services.electricityDesc,
              },
              {
                imageKey: "drywall",
                name: t.services.drywall,
                desc: t.services.drywallDesc,
              },
              {
                imageKey: "flooring",
                name: t.services.flooring,
                desc: t.services.flooringDesc,
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="service-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 group"
              >
                {/* Contenedor de imagen con tamaño fijo y recorte CSS */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  <img
                    src={serviceImages[service.imageKey]}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `${BASE_PATH}/services/default.jpg`;
                      e.target.onerror = null;
                    }}
                  />
                  {/* Overlay de color al hover */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300"></div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="gallery" className="py-16 bg-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.gallery.title}
          </h2>
          <p
            className="text-center text-gray-600 mb-12 subtitle"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.gallery.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Imagen+próximamente";
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p
                    className="text-white font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal para galería */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selectedImage.title}
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {selectedImage.category}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partnerships Section - Versión con tarjetas uniformes */}
      <section id="partnerships" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.partnerships.title}
            </h2>
            <p
              className="text-gray-600 subtitle"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.partnerships.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {t.partnerships.items.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 group"
              >
                {/* Contenedor de imagen cuadrado y centrado */}
                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6">
                  <img
                    src={
                      idx === 0
                        ? partnershipImages.une
                        : idx === 1
                          ? partnershipImages.torreVentura
                          : idx === 2
                            ? partnershipImages.puntoSur
                            : idx === 3
                              ? partnershipImages.vibranta
                              : partnershipImages.espacioMinerva
                    }
                    alt={partner.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x150?text=Logo";
                      e.target.onerror = null;
                    }}
                  />
                </div>

                {/* Contenido */}
                <div className="p-4 text-center border-t border-gray-100">
                  <h3
                    className="font-semibold text-gray-800 mb-1 text-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {partner.name}
                  </h3>
                  <p
                    className="text-gray-500 text-xs line-clamp-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto flotante y footer */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.032 2.016c4.939 0 8.953 4.014 8.953 8.953 0 4.94-4.014 8.953-8.953 8.953-1.616 0-3.128-.432-4.454-1.191l-4.966 1.322 1.354-4.776c-.871-1.367-1.373-2.96-1.373-4.672 0-4.94 4.014-8.953 8.953-8.953zM12.032 0C5.368 0 .012 5.357.012 12.021c0 2.182.585 4.23 1.605 6.002L0 24l6.146-1.61c1.74.955 3.744 1.509 5.886 1.509 6.664 0 12.021-5.357 12.021-12.021S18.696 0 12.032 0z" />
          </svg>
          <span className="hidden group-hover:inline text-sm font-medium">
            WhatsApp
          </span>
        </button>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
            &copy; 2025 {t.name} - {t.footer.rights}
          </p>
          <p
            className="text-sm text-gray-400 mt-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.footer.license}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
