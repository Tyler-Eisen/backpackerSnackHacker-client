import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';

export default function Map() {
  // eslint-disable-next-line no-unused-vars
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >Mappp
      </ReactMapGl>
    </div>
  );
}
