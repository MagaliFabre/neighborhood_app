import React from 'react';
import Registration from './auth/Registration';
import MapContainer from '../components/modules/MapContainer';

function HomePage(props) {
  // Define markers here or props
  const markers = []; // Define markers array here

  return (
    <div>
      <h1>Welcome!</h1>
      <Registration />
      <MapContainer markers={markers} />
    </div>
  );
}

export default HomePage;



/*
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to NeighborHelp!</h1>
      <MapContainer />
    </div>
  );
}

export default HomePage;
*/
