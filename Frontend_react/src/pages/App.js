import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/layout/Navbar";
import { HomePage } from "./HomePage";
import Dashboard from "./Dashboard";
import MobileFooter from "../components/layout/MobileFooter";
import HelpRequestForm from "./HelpRequestForm"
import ConversationList from './ConversationList';
import Conversation from './Conversation';

axios.defaults.withCredentials = true;

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  };

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser({});
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in")
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user);
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({});
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            }
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard loggedInStatus={loggedInStatus} />}
          />
          <Route 
            exact
            path="/new-help-request" 
            element={<HelpRequestForm/>} 
          />
          <Route 
            exact 
            path="/conversationlist" 
            element={<ConversationList/>} 
          />
          <Route 
            path="/conversations/:id" 
            element={<Conversation/>} 
          />
        </Routes>
        <MobileFooter />
      </div>
  );
}

export default App;






// axios.defaults.withCredentials = true;

// const App = () => {
//   constructor() {
//     super();

//     this.state = {
//       loogedInStatus: "NOT_LOGGED_IN",
//       user: {}
//     }
//   }

//   render() {
//     return (
//     <div className='app'>
      
//       <Navbar />
//         <Routes>
//           <Route exact path={"/"} element={ <HomePage/>} />
//           <Route exact path={"/dashboard"} element={<Dashboard/>} />
//         </Routes>
//         <MobileFooter />
      
//     </div>
//   );
//   }
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from '../components/layout/Navbar';
// import MobileFooter from '../components/layout/MobileFooter';
// import HomePage from './HomePage';
// import SignupPage from './SignupPage';
// import SigninPage from './SigninPage';
// import AccueilPage from './AccueilPage';
// import HelpRequestForm from './HelpRequestForm';

// function App() {
//   const [setUser]=useState({})
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/signin" element={<SigninPage setUser={setUser} />} /> 
//         <Route path="/accueil" element={<AccueilPage />} />
//         <Route path="/new-help-request" element={<HelpRequestForm />} />
//       </Routes>
//       <MobileFooter />
//     </Router>
//   );
// }

// export default App;
