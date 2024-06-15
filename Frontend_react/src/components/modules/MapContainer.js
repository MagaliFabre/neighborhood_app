import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const mapContainerStyle = {
  width: '100%',
  height: '50vh',
};

const mapWrapperStyle = {
  margin: '0 auto', // Centrer la carte horizontalement
  maxWidth: '800px', // Limiter la largeur de la carte 
};

function MapContainer({ currentUserId }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA8u9fgXmtkcJKH4VUNmzkDheIt0MhbemM', // Remplacez par votre clé API Google Maps
  });

  const mapRef = useRef(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 48.8566, lng: 2.3522 }); // Default to Paris

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Détermine si l'écran est mobile

  const handleVolunteerClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setMessageContent('');
  };

  const diff_hours = (dt2, dt1) => {
    // Calculate the difference in milliseconds between the two provided Date objects by subtracting the milliseconds value of dt1 from the milliseconds value of dt2
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    // Convert the difference from milliseconds to hours by dividing it by the number of seconds in an hour (3600)
    diff /= (60 * 60);
    // Return the absolute value of the rounded difference in hours
    return Math.abs(diff);
  }

  const handleMessageSend = async () => {
    if (!selectedMarker) return; // No marker selected 

    try {
      const response = await axios.post(`https://neighborhood-app-back.onrender.com/messages`, {
        message: {
          content: messageContent,
          title: selectedMarker.title,
          sender_id: currentUserId,
          receiver_id: selectedMarker.user_id,
          help_request_id: selectedMarker.id, // envoyer l'ID de la demande d'aide
          sent_at: new Date(),
          status: 'sent'
        }
      });

      console.log('Message sent:', response.data);
      handleModalClose();
    } catch (error) {
      console.error('Error sending message:', error);
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
    axios.get(`https://neighborhood-app-back.onrender.com/help_requests`)
      .then(response => {
        response.data.forEach(marker => {
          const date1 = new Date(marker.created_at);
          const date2 = new Date(Date.now());

          if (diff_hours(date1, date2) >= 24 && marker.created_at === marker.updated_at) {
            console.log("RECYCLE");
            // axios put request to change the record of that marker to be recycled or over 24 hours
            axios.put(`https://neighborhood-app-back.onrender.com/help_requests/${marker.id}`, { ...marker, recycled: true }).then(response => { console.log(response) })
          }
        });

        // attention chaque marqueur a des valeurs valides pour latitude et longitude
        const validMarkers = response.data.filter(marker => !marker.recycled);
        setMapMarkers(validMarkers);
      })
      .catch(error => console.error('Error fetching help requests:', error));
  }, []);
  // add time to help request and then add the logic for 24h


  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded ? (
    <div style={mapWrapperStyle}>
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
          axios.get(`https://neighborhood-app-back.onrender.com/help_requests?ne=${ne.lat()},${ne.lng()}&sw=${sw.lat()},${sw.lng()}`)
            .then(response => {
              const validMarkers = response.data.filter(marker => !marker.recycled);
              console.log(validMarkers);
              setMapMarkers(validMarkers);
            })
            .catch(error => console.error('Error fetching help requests:', error));
        }}
      >
        {
          mapMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onClick={() => handleMarkerClick(marker)}
              icon={{
                url: marker.request_type === 'material-assistance' ? 'red-marker-icon.png' : 'blue-marker-icon.png',
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))
        }
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
              <p>Type: {selectedMarker.request_type}</p>
              {/* <p>Created by: {selectedMarker.user_id}</p> Ajouter le nom du créateur */}
              <Button onClick={handleVolunteerClick} variant="contained">Volunteer</Button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap >

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: isMobile ? '90%' : 400, maxWidth: '90%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            Send a Message
          </Typography>
          <TextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleMessageSend} sx={{ mt: 2 }}>Send</Button>
          <Button variant="contained" onClick={handleModalClose} sx={{ mt: 2, ml: 2 }}>Close</Button>
        </Box>
      </Modal>
    </div >
  ) : (
    <div>Loading map...</div>
  );
}

export default MapContainer;
