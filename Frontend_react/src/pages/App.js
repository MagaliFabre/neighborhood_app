import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<HomePage />} />
          <Route exact path={"/dashboard"} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

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
