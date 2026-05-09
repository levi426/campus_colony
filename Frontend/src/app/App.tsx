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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={(admin) => { setIsLoggedIn(true); setIsAdmin(admin); }} />} />

        <Route element={<Layout isAdmin={isAdmin} />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/area-insight" element={<AreaInsight />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/mess/:id" element={<MessDetails />} />
          {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
