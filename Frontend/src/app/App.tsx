import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import AreaInsight from './components/AreaInsight';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import AIAssistant from './components/AIAssistant';
import AdminDashboard from './components/AdminDashboard';
import MessDetails from './components/MessDetails';
import MessPage from './components/MessPage';
import UserDashboard from './components/UserDashboard';
import HostelVisit from './components/HostelVisit';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('cc_token') || localStorage.getItem('cc_role')));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('cc_role') === 'admin');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={(admin) => { setIsLoggedIn(true); setIsAdmin(admin); }} />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mess" element={<MessPage />} />
          <Route path="/area-insight" element={<AreaInsight />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/mess/:id" element={<MessDetails />} />
        </Route>
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user" element={isLoggedIn && !isAdmin ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/user/hostel/:id" element={isLoggedIn && !isAdmin ? <HostelVisit /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
