import { useState, useEffect } from 'react'
import { texts } from './locales'
import './App.css'

// IMPORTANTE: Define la base path según tu repositorio
const BASE_PATH = '/robertomedina'

const galleryImages = [
  { id: 1, src: `${BASE_PATH}/gallery/obra1.jpg`, title: "Remodelación de baño", category: "Remodelación" },
  { id: 2, src: `${BASE_PATH}/gallery/obra2.jpg`, title: "Impermeabilización de azotea", category: "Impermeabilización" },
  { id: 3, src: `${BASE_PATH}/gallery/obra3.jpg`, title: "Pintura exterior", category: "Pintura" },
  { id: 4, src: `${BASE_PATH}/gallery/obra4.jpg`, title: "Instalación de piso", category: "Pisos" },
  { id: 5, src: `${BASE_PATH}/gallery/obra5.jpg`, title: "Herrería - portón", category: "Herrería" },
  { id: 6, src: `${BASE_PATH}/gallery/obra6.jpg`, title: "Fontanería completa", category: "Fontanería" },
  { id: 7, src: `${BASE_PATH}/gallery/obra7.jpg`, title: "Tablaroca plafón", category: "Tablaroca" },
  { id: 8, src: `${BASE_PATH}/gallery/obra8.jpg`, title: "Albañilería - muro", category: "Albañilería" },
]

function App() {
  const [language, setLanguage] = useState('es')
  const [selectedImage, setSelectedImage] = useState(null)
  const t = texts[language]

  // Función para cambiar idioma
  const changeLanguage = (newLang) => {
    setLanguage(newLang)
    localStorage.setItem('preferred_language', newLang)
    
    // Actualizar URL con parámetro
    const url = new URL(window.location)
    url.searchParams.set('lang', newLang)
    window.history.pushState({}, '', url)
  }

  // Detectar idioma al cargar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langFromUrl = urlParams.get('lang')
    
    if (langFromUrl === 'en' || langFromUrl === 'es') {
      setLanguage(langFromUrl)
      localStorage.setItem('preferred_language', langFromUrl)
      return
    }
    
    const savedLang = localStorage.getItem('preferred_language')
    if (savedLang === 'en' || savedLang === 'es') {
      setLanguage(savedLang)
      const url = new URL(window.location)
      url.searchParams.set('lang', savedLang)
      window.history.replaceState({}, '', url)
      return
    }
    
    setLanguage('es')
    localStorage.setItem('preferred_language', 'es')
    const url = new URL(window.location)
    url.searchParams.set('lang', 'es')
    window.history.replaceState({}, '', url)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const handleWhatsApp = () => {
    const phoneNumber = "3327466072"
    const message = language === 'es' 
      ? "Hola Roberto, me interesa tu servicio. ¿Podemos conversar?"
      : "Hello Roberto, I'm interested in your service. Can we talk?"
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - el mismo código que tenías */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{t.name}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{t.title}</p>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.services}
              </a>
              <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.gallery}
              </a>
              <a href="#partnerships" onClick={(e) => handleNavClick(e, 'partnerships')} className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.partnerships}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-sm ${language === 'es' ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>ES</span>
              <button
                onClick={() => changeLanguage(language === 'es' ? 'en' : 'es')}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                style={{ backgroundColor: language === 'es' ? '#3b82f6' : '#9ca3af' }}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                    language === 'en' ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className={`text-sm ${language === 'en' ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>EN</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            {t.hero.greeting} <span className="text-blue-600">{t.name}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t.hero.description}
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.contact.button}
          </button>
        </div>
      </section>

      {/* Servicios - Grid atractivo */}
      <section id="services" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧱", name: t.services.masonry, desc: t.services.masonryDesc },
              { icon: "🎨", name: t.services.painting, desc: t.services.paintingDesc },
              { icon: "🚰", name: t.services.plumbing, desc: t.services.plumbingDesc },
              { icon: "☔", name: t.services.waterproofing, desc: t.services.waterproofingDesc },
              { icon: "🔧", name: t.services.ironwork, desc: t.services.ironworkDesc },
              { icon: "🏠", name: t.services.remodeling, desc: t.services.remodelingDesc },
              { icon: "⚡", name: t.services.electricity, desc: t.services.electricityDesc },
              { icon: "🪜", name: t.services.drywall, desc: t.services.drywallDesc },
              { icon: "🪵", name: t.services.flooring, desc: t.services.flooringDesc },
            ].map((service, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería con efectos */}
      <section id="gallery" className="py-16 bg-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{t.gallery.title}</h2>
          <p className="text-center text-gray-600 mb-12">{t.gallery.subtitle}</p>
          
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
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Imagen+próximamente" }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal para galería al hacer click */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-auto max-h-[70vh] object-contain" />
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.category}</p>
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

      {/* Partnerships Section */}
      <section id="partnerships" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.partnerships.title}</h2>
          <p className="text-gray-600 mb-8">{t.partnerships.subtitle}</p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md">
            <p className="text-xl font-semibold text-blue-800">{t.partnerships.une}</p>
            <p className="text-gray-500 mt-4 italic">{t.partnerships.more}</p>
          </div>
          {/* Espacio abierto para más ejemplos */}
          <div className="mt-8 border-t-2 border-dashed border-gray-200 pt-8">
            <p className="text-gray-400 text-sm">🚧 Más alianzas y proyectos en construcción 🚧</p>
          </div>
        </div>
      </section>

      {/* Contacto flotante y footer */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.032 2.016c4.939 0 8.953 4.014 8.953 8.953 0 4.94-4.014 8.953-8.953 8.953-1.616 0-3.128-.432-4.454-1.191l-4.966 1.322 1.354-4.776c-.871-1.367-1.373-2.96-1.373-4.672 0-4.94 4.014-8.953 8.953-8.953zM12.032 0C5.368 0 .012 5.357.012 12.021c0 2.182.585 4.23 1.605 6.002L0 24l6.146-1.61c1.74.955 3.744 1.509 5.886 1.509 6.664 0 12.021-5.357 12.021-12.021S18.696 0 12.032 0z" />
          </svg>
          <span className="hidden group-hover:inline text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 {t.name} - {t.footer.rights}</p>
          <p className="text-sm text-gray-400 mt-2">{t.footer.license}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
