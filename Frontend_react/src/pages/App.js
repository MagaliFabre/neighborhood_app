import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/layout/Navbar";
import { HomePage } from "./HomePage";
import Dashboard from "./Dashboard";
import MobileFooter from "../components/layout/MobileFooter";
import HelpRequestForm from "./HelpRequestForm";
import ConversationMessages from './ConversationMessages';
import Registration from "./auth/Registration";
import MessageList from "./MessageList";
import HelpRequestDetails from "./HelpRequestDetails";
import HelpRequestEditForm from "./HelpRequestEditForm";
import MyHelpRequests from "./MyHelpRequests";

axios.defaults.withCredentials = true;

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(false);


  const currentUserId = user.id;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  };

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate("/dashboard"); // Redirect to dashboard
  };

  useEffect(() => {
    if (username && password) {
      fetch(`https://neighborhood-app-back.onrender.com/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.logged_in) {
            setUser(data.user);
          } else {
            alert('Invalid credentials');
          }
        });
    }
  }, [username, password]);

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser({});
  };

  const checkLoginStatus = useCallback(() => {
    axios
      .get(`https://neighborhood-app-back.onrender.com/logged_in`)
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
  }, [loggedInStatus]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <div className="app">
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              loggedInStatus={loggedInStatus}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={<Dashboard loggedInStatus={loggedInStatus} user={user} />}
        />
        <Route
          exact
          path="/new-help-request"
          element={<HelpRequestForm loggedInStatus={loggedInStatus} currentUserId={currentUserId} />}
        />
        <Route exact path="/messages" element={<MessageList currentUserId={currentUserId} setUnreadMessages={setUnreadMessages} />} />
        <Route exact path="/conversation/:id" element={<ConversationMessages />} />
        <Route
          exact
          path="/signup"
          element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} loggedInStatus={loggedInStatus} />}
        />
        <Route
          exact
          path="/show-help-request/:id"
          element={<HelpRequestDetails />}
        />
        <Route
          exact
          path="/edit-help-request/:id"
          element={<HelpRequestEditForm />}
        />
        <Route
          exact
          path="/my-help-requests"
          element={<MyHelpRequests currentUserId={currentUserId}/>}
        />
      </Routes>
      {location.pathname !== '/' && <MobileFooter />}
    </div>
  );
}

export default App;
