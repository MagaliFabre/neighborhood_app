import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 48.8566,
  lng: 2.3522,
};

function MapContainer() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA8u9fgXmtkcJKH4VUNmzkDheIt0MhbemM',
  });

  const mapRef = useRef(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      mapRef.current.panTo(center);
    }
  }, [isLoaded]);

  useEffect(() => {
    axios.get('http://localhost:3000/help_requests')
      .then(response => {
        // Vérifiez que chaque marqueur a des valeurs valides pour latitude et longitude
        const validMarkers = response.data.filter(marker => {
          const isValid = typeof marker.latitude === 'number' && typeof marker.longitude === 'number';
          if (!isValid) {
            console.error('Invalid marker:', marker);
          }
          return isValid;
        });
        setMapMarkers(validMarkers);
      })
      .catch(error => console.error('Error fetching help requests:', error));
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      onDragEnd={() => {
        const bounds = mapRef.current.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        axios.get(`http://localhost:3000/help_requests?ne=${ne.lat()},${ne.lng()}&sw=${sw.lat()},${sw.lng()}`)
          .then(response => {
            const validMarkers = response.data.filter(marker => {
              const isValid = typeof marker.latitude === 'number' && typeof marker.longitude === 'number';
              if (!isValid) {
                console.error('Invalid marker:', marker);
              }
              return isValid;
            });
            setMapMarkers(validMarkers);
          })
          .catch(error => console.error('Error fetching help requests:', error));
      }}
    >
      {mapMarkers.map(marker => (
        <Marker 
          key={marker.id} 
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={() => handleMarkerClick(marker)}
          icon={{
            url: marker.request_type === 'material-assistance' ? 'red-marker-icon.png' : 'blue-marker-icon.png',
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.title}</h3>
            <p>{selectedMarker.description}</p>
            <p>Type: {selectedMarker.request_type}</p>
            <button onClick={() => {/* handle volunteer action */}}>Volunteer</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Chargement de la carte...</div>
  );
}

export default MapContainer;
