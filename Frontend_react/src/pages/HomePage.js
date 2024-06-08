import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Registration } from './auth/Registration';
import { Login } from './auth/Login';


export const HomePage = (props) => {
  const { handleLogin, handleLogout, loggedInStatus } = props;
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate("/dashboard"); // Utilisation de navigate pour rediriger
  };

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        console.log(response.status);
        handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

 

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <button onClick={handleLogoutClick}>Logout</button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};


// import React from 'react';
// import Registration from './auth/Registration';
// import MapContainer from '../components/modules/MapContainer';

// const auth = (input) => console.log(input); 

// function HomePage(props) {
  
//   const markers = []; 

//   return (
//     <div>
//       <h1>Welcome!</h1>
//       <Registration handleSuccessfulAuth={auth} />
//       <MapContainer markers={markers} />
//     </div>
//   );
// }

// export default HomePage;



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
