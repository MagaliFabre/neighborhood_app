import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/layout/Navbar";
import { HomePage } from "./HomePage";
import Dashboard from "./Dashboard";
import MobileFooter from "../components/layout/MobileFooter";
import HelpRequestForm from "./HelpRequestForm";
// import ChatroomWebSocket from './ChatroomWebSocket';
import MessageFlow from './MessageFlow';


axios.defaults.withCredentials = true;

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const [username, setUsername] = useState(''); // Définir la variable username
  const [password, setPassword] = useState(''); // Définir la variable password

  const [chatroom, setChatroom] = useState(null);
  const [messages, setMessages] = useState([]);

  const updateApp = (message) => {
    setMessages([...messages, message]);
  };

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data.user);
  };

  // Utiliser username et password dans votre requête fetch
  useEffect(() => {
    if (username && password) {
      fetch('http://localhost:3000/login', {
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
              setUsername={setUsername} // Passer la fonction setUsername
              setPassword={setPassword} // Passer la fonction setPassword
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
          element={<HelpRequestForm />}
        />
        <Route
          path="/message_flows/:messageFlowId"
          component={MessageFlow}
        />
      </Routes>
      <MobileFooter />
    </div>
  );
}



//   return (
//     <div>
//       {user ? (
//         <div>
//           <h1>Welcome, {user.username}</h1>
//           {chatroom && (
//             <ChatroomWebSocket
//               cableApp={cableApp}
//               chatroomId={chatroom.id}
//               messages={messages}
//               updateApp={updateApp}
//             />
//           )}
//         </div>
//       ) : (
//         <Login setUser={setUser} />
//       )}
//     </div>
//   );
// };

export default App;
