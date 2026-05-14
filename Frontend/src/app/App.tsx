import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
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
import ListingDetails from './components/ListingDetails';
import { AuthRole, clearStoredAuth, getCurrentUser } from '../api/api';

function ProtectedRoute({ role, children }: { role: AuthRole; children: JSX.Element }) {
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((user) => {
        if (cancelled) return;

        if (user.role === role) {
          localStorage.setItem('cc_role', user.role);
          localStorage.setItem('cc_email', user.email);
          setStatus('allowed');
        } else {
          clearStoredAuth();
          setStatus('denied');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('denied');
      });

    return () => {
      cancelled = true;
    };
  }, [role]);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] text-[#20272B]">
        Verifying access...
      </div>
    );
  }

  return status === 'allowed' ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

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
        <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/hostel/:id" element={<ProtectedRoute role="USER"><HostelVisit /></ProtectedRoute>} />
        <Route path="/listing/:listingId" element={<ProtectedRoute role="USER"><ListingDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
