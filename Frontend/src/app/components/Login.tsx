import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Mail, Lock, Building2, ArrowLeft } from 'lucide-react';
import { loginUser } from '../../api/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await loginUser(email, password);
      localStorage.setItem('cc_email', email);
      const admin = result.role === 'ADMIN';
      localStorage.setItem('cc_role', admin ? 'ADMIN' : 'USER');
      navigate(admin ? '/admin' : '/user');
    } catch {
      setError('Login failed. Check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Left Panel - Dark */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#121212] text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <Building2 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">CampusColony</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
              <p className="text-gray-300 text-lg">Access your account to manage hostels, bookings, and area insights.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#121212] font-bold text-sm mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Verified Listings</h3>
                  <p className="text-gray-400 text-sm">All hostels are thoroughly vetted</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#121212] font-bold text-sm mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Area Intelligence</h3>
                  <p className="text-gray-400 text-sm">Complete insights for Faisal Town</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#121212] font-bold text-sm mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Smart recommendations & support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-sm">
          Copyright © 2026 Campus Colony
        </div>
      </div>

      {/* Right Panel - Light */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E9ECEF]">
            <Link to="/home" className="inline-flex items-center gap-2 text-[#121212] hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h2 className="text-3xl font-bold text-[#121212] mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Login to your Campus Colony account</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-[#121212] font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#121212] bg-white"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="w-4 h-4 accent-[#121212]" />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] text-white py-3 rounded-xl hover:bg-[#2D2D2D] transition-colors"
              >
                Login
              </button>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            </form>

            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#121212] font-medium hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
