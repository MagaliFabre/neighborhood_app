import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

function MapContainer() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA8u9fgXmtkcJKH4VUNmzkDheIt0MhbemM',
  });

  const mapRef = useRef(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 48.8566, lng: 2.3522 }); // Default to Paris

  const handleVolunteerClick = async () => {
    if (!selectedMarker) return; // No marker selected

    try {
      // Make a POST request to create a chat or message flow associated with the selected marker's help request
      const response = await axios.post(`http://localhost:3000/help_requests/${selectedMarker.id}/create_chat_or_message_flow`);

      // Extract the chat or message flow ID from the response
      const chatOrMessageFlowId = response.data.chat_or_message_flow_id;

      // Now you can use the chatOrMessageFlowId to navigate to the chat or message flow page or perform any other action
      console.log('Chat or message flow created with ID:', chatOrMessageFlowId);
    } catch (error) {
      console.error('Error creating chat or message flow:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      // Try to get the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude });
          }
        },
        () => {
          console.error('Error getting the current location');
        }
      );
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
      center={currentLocation}
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
            {/* Button to trigger the handleVolunteerClick function */}
            <button onClick={handleVolunteerClick}>Volunteer</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Chargement de la carte...</div>
  );
}

export default MapContainer;