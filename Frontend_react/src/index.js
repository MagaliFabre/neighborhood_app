import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer createRoot à partir de react-dom/client
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import actionCable from 'actioncable';
require('dotenv').config()
const CableApp = {};
CableApp.cable = actionCable.createConsumer('ws://neighborhood-app-back.onrender.com/cable');

const root = ReactDOM.createRoot(document.getElementById('root')); // Utiliser createRoot directement
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App cableApp={CableApp} />
    </BrowserRouter>
  </React.StrictMode>
);

const API_KEY = 'AIzaSyA8u9fgXmtkcJKH4VUNmzkDheIt0MhbemM';

export default API_KEY;

reportWebVitals();
