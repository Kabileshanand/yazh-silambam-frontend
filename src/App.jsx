import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import BareHandTechniques from './pages/BareHandTechniques';
import StickFencing from './pages/StickFencing';
import WeaponryTraining from './pages/WeaponryTraining';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bare-hand-techniques" element={<BareHandTechniques />} />
          <Route path="/stick-fencing" element={<StickFencing />} />
          <Route path="/weaponry-training" element={<WeaponryTraining />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
