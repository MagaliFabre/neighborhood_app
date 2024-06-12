import React from 'react';
import MapContainer from '../components/modules/MapContainer';

const Dashboard = ({ loggedInStatus }) => {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {loggedInStatus}</h1>
        <MapContainer markers={markers}/>
      </div>
    </div>
  );
};

const markers = [];
export default Dashboard;
