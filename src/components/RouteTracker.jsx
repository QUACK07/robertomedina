import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Envía la vista de página cada vez que la URL cambia
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);

  return null; // Este componente no renderiza nada visible
};

export default RouteTracker;
