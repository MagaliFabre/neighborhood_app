import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 48.8566,
  lng: 2.3522,
};

function MapContainer({ markers }) { 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA8u9fgXmtkcJKH4VUNmzkDheIt0MhbemM', 
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      mapRef.current.panTo(center);
    }
  }, [isLoaded, mapRef]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {markers.map(marker => (
        <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  ) : (
    <div>Chargement de la carte...</div>
  );
}

export default MapContainer;


