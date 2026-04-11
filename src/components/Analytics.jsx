import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

const Analytics = () => {
  useEffect(() => {
    // Obtener el ID desde las variables de entorno
    const gaId = import.meta.env.VITE_GA_ID;
    
    if (gaId) {
      ReactGA.initialize(gaId, {
        gtagOptions: {
          send_page_view: false, // 👈 Evita el conteo doble
        },
      });
      console.log('✅ Google Analytics inicializado correctamente');
    } else {
      console.warn('⚠️ No se encontró la ID de Google Analytics');
    }
  }, []);

  return null; // Este componente no renderiza nada visible
};

export default Analytics;
