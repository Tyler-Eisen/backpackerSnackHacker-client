import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';

export default function Map() {
  // eslint-disable-next-line no-unused-vars
  const [viewport, setViewport] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onViewportChange={() => {
          setViewport(viewport);
        }}
      />
    </div>
  );
}
