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

  const handleVolunteer = () => {
    axios.post('http://localhost:3000/conversations', {
      recipient_id: selectedMarker.user_id
    })
      .then(response => {
        const conversationId = response.data.id;
        window.location.href = `/conversations/${conversationId}`;
      })
      .catch(error => {
        console.error('Error creating conversation:', error);
      });
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
              let isValid = typeof marker.latitude === 'number' && typeof marker.longitude === 'number'&& marker.fulfilled === false;
              // add if marker is not fullfill logic 
              // if marker

              // check the 24h in the frontend, 

              // function diff_hours(dt2, dt1) {
              //   console.log()
              //   // Calculate the difference in milliseconds between the two provided Date objects by subtracting the milliseconds value of dt1 from the milliseconds value of dt2
              //   var diff = (dt2.getTime() - dt1.getTime()) / 1000;
              //   // Convert the difference from milliseconds to hours by dividing it by the number of seconds in an hour (3600)
              //   diff /= (60 * 60);
              //   // Return the absolute value of the rounded difference in hours
              //   return Math.abs(Math.round(diff));

              // }
              // const date1 = new Date(marker.created_at);
              // const date2 = new Date(Date.now());

              // if (diff_hours(date1, date) >= 24) {
              //   isValid = false;
              //   // axios put request to change the record of that marker to be recycled or over 24 hours
              // }

              // console.log(diff_hours(date1, date2));


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
            <button onClick={handleVolunteer}>Volunteer</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Chargement de la carte...</div>
  );
}

export default MapContainer;
