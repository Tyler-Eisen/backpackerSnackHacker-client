import React, { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import shopData from '../utils/data/shops.json';

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  console.log('shopData:', shopData);

  return (
    <div>
      <ReactMapGl
        {...viewport} // Spread the viewport properties here
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onViewportChange={(newViewport) => {
          setViewport(newViewport); // Update the viewport state
        }}
      >
        {shopData.map((shop) => (
          <Marker key={shop.pk} latitude={shop.fields.latitude} longitude={shop.fields.longitude}>
            <div>{shop.fields.name}</div>
          </Marker>
        ))}
      </ReactMapGl>
    </div>
  );
}
